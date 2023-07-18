using AutoMapper;
using FluentAssertions;
using Moq;
using Project.BusinessLayer.Services.ExamServices;
using Project.BusinessLayer.Validation.Services;
using Project.DataAccessLayer.Repositories.ExamRepositories;
using Project.DataAccessLayer.Repositories.WorkingDayRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Exceptions;
using Project.Domain.Requests.Exam;
using Xunit;

namespace Project.BusinessLayer.Tests.Services;

public class ExamServiceTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IExamRepository> _examRepositoryMock;
    private readonly Mock<IWorkingDayRepository> _workingDayRepositoryMock;
    private readonly Mock<IValidationService> _validationServiceMock;
    private readonly ExamService _examService;

    public ExamServiceTests()
    {
        _mapperMock = new Mock<IMapper>();
        _examRepositoryMock = new Mock<IExamRepository>();
        _workingDayRepositoryMock = new Mock<IWorkingDayRepository>();
        _validationServiceMock = new Mock<IValidationService>();

        _examService = new ExamService(_mapperMock.Object, _examRepositoryMock.Object,
            _workingDayRepositoryMock.Object, _validationServiceMock.Object);
    }

    [Fact]
    public async Task GetAllExamsAsync_ShouldReturnAllStudents()
    {
        // Arrange
        var expectedExamEntities = GenerateTestExamEntities();
        var expectedExamDtos = ConvertExamEntitiesToDtos(expectedExamEntities);

        _examRepositoryMock.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(expectedExamEntities);
        _mapperMock.Setup(m => m.Map<IReadOnlyCollection<ExamDto>>(expectedExamEntities))
            .Returns(expectedExamDtos);

        // Act
        var result = await _examService.GetAllExamsAsync();

        // Assert
        result.Should().Equal(expectedExamDtos);
        _mapperMock.Verify(m => m.Map<IReadOnlyCollection<ExamDto>>(expectedExamEntities), Times.Once);
        _examRepositoryMock.Verify(repo => repo.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task CreateExamAsync_WithValidRequest_ShouldCreateExamAndReturnExamDto()
    {
        // Arrange
        var request = new CreateExamRequest
        {
            SubjectId = Guid.NewGuid(),
            TeacherId = Guid.NewGuid(),
            Date = DateTime.Now,
            StudentIds = new[] { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), }
        };

        var workingDayId = Guid.NewGuid();
        var examEntity = new Exam
        {
            Id = Guid.NewGuid(),
            Subject = new Subject
            {
                Id = request.SubjectId,
                Title = "Title 1",
                Description = "Description 1"
            },
            TeacherWorkingDay = new WorkingDay
            {
                Id = workingDayId,
                Date = request.Date,
                Teacher = new Teacher
                {
                    Id = request.TeacherId,
                    FirstName = "FirstName 1",
                    LastName = "LastName 1",
                    MiddleName = "MiddleName 1"
                }
            }
        };

        var createdExamDto = ConvertExamEntityToDto(examEntity);

        _mapperMock.Setup(mapper => mapper.Map<Exam>(request)).Returns(examEntity);
        _workingDayRepositoryMock.Setup(repo => repo
                .GetByTeacherIdAndDateAsync(request.TeacherId, request.Date))
            .ReturnsAsync(new WorkingDay { Id = workingDayId });
        _examRepositoryMock.Setup(repo => repo.InsertAsync(examEntity))
            .ReturnsAsync(examEntity);
        _mapperMock.Setup(mapper => mapper.Map<ExamDto>(examEntity)).Returns(createdExamDto);

        // Act
        var result = await _examService.CreateExamAsync(request);

        // Assert
        Assert.Equal(workingDayId, examEntity.TeacherWorkingDayId);
        result.Should().BeEquivalentTo(createdExamDto);
        _mapperMock.Verify(mapper => mapper.Map<Exam>(request), Times.Once);
        _workingDayRepositoryMock.Verify(repo =>
            repo.GetByTeacherIdAndDateAsync(request.TeacherId, request.Date), Times.Once);
        _mapperMock.Verify(mapper => mapper.Map<ExamDto>(examEntity), Times.Once);
    }

    [Fact]
    public async Task CreateExamAsync_WithInValidRequest_ShouldThrowEntityNotFoundException()
    {
        // Arrange
        var request = new CreateExamRequest
        {
            SubjectId = Guid.NewGuid(),
            TeacherId = Guid.NewGuid(),
            Date = DateTime.Now,
            StudentIds = new[] { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), }
        };

        _workingDayRepositoryMock.Setup(repo => repo
                .GetByTeacherIdAndDateAsync(request.TeacherId, request.Date))
            .ReturnsAsync((WorkingDay?)null);

        // Act
        var act = () => _examService.CreateExamAsync(request);

        // Assert
        await Assert.ThrowsAsync<EntityNotFoundException>(act);
        _workingDayRepositoryMock.Verify(repo =>
            repo.GetByTeacherIdAndDateAsync(request.TeacherId, request.Date), Times.Once);
    }

    private List<Exam> GenerateTestExamEntities()
    {
        var exams = new List<Exam>()
        {
            new()
            {
                Id = Guid.NewGuid(),
                Subject = new Subject
                {
                    Id = Guid.NewGuid(),
                    Title = "Title 1",
                    Description = "Description 1"
                },
                TeacherWorkingDay = new WorkingDay
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now.AddDays(1),
                    Teacher = new Teacher
                    {
                        Id = Guid.NewGuid(),
                        FirstName = "FirstName 1",
                        LastName = "LastName 1",
                        MiddleName = "MiddleName 1"
                    }
                }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Subject = new Subject
                {
                    Id = Guid.NewGuid(),
                    Title = "Title 2",
                    Description = "Description 2"
                },
                TeacherWorkingDay = new WorkingDay
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now.AddDays(2),
                    Teacher = new Teacher
                    {
                        Id = Guid.NewGuid(),
                        FirstName = "FirstName 2",
                        LastName = "LastName 2",
                        MiddleName = "MiddleName 2"
                    }
                }
            },
        };

        return exams;
    }

    private List<ExamDto> ConvertExamEntitiesToDtos(List<Exam> exams)
    {
        var examDtos = new List<ExamDto>();

        foreach (var exam in exams)
        {
            var examDto = ConvertExamEntityToDto(exam);

            examDtos.Add(examDto);
        }

        return examDtos;
    }

    private ExamDto ConvertExamEntityToDto(Exam exam)
    {
        var examDto = new ExamDto
        {
            Id = exam.Id,
            Date = exam.TeacherWorkingDay.Date,
            Teacher = new TeacherDto
            {
                Id = exam.TeacherWorkingDay.Teacher.Id,
                FirstName = exam.TeacherWorkingDay.Teacher.FirstName,
                LastName = exam.TeacherWorkingDay.Teacher.LastName,
                MiddleName = exam.TeacherWorkingDay.Teacher.MiddleName,
            },
            Subject = new SubjectBriefDto
            {
                Id = exam.Subject.Id,
                Title = exam.Subject.Title
            }
        };

        return examDto;
    }
}