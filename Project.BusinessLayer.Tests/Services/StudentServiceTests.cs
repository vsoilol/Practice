using AutoMapper;
using FluentAssertions;
using Moq;
using Project.BusinessLayer.Services.StudentServices;
using Project.DataAccessLayer.Repositories.StudentRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Student;
using Xunit;

namespace Project.BusinessLayer.Tests.Services;

public class StudentServiceTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IStudentRepository> _studentRepositoryMock;
    private readonly StudentService _studentService;

    public StudentServiceTests()
    {
        _mapperMock = new Mock<IMapper>();
        _studentRepositoryMock = new Mock<IStudentRepository>();
        _studentService = new StudentService(_mapperMock.Object, _studentRepositoryMock.Object);
    }

    [Fact]
    public async Task GetAllStudentsAsync_ShouldReturnAllStudents()
    {
        // Arrange
        var expectedStudentEntities = GenerateTestStudentEntities();
        var expectedStudentDtos = ConvertStudentEntitiesToDtos(expectedStudentEntities);
        
        _studentRepositoryMock.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(expectedStudentEntities);
        _mapperMock.Setup(m => m.Map<IReadOnlyCollection<StudentDto>>(expectedStudentEntities))
            .Returns(expectedStudentDtos);

        // Act
        var result = await _studentService.GetAllStudentsAsync();

        // Assert
        result.Should().Equal(expectedStudentDtos);
        _mapperMock.Verify(m => m.Map<IReadOnlyCollection<StudentDto>>(expectedStudentEntities), Times.Once);
        _studentRepositoryMock.Verify(repo => repo.GetAllAsync(), Times.Once);
    }
    
    [Fact]
    public async Task GetAllStudentsAsync_ShouldReturnEmptyCollection_WhenNoStudentsExist()
    {
        // Arrange
        var expectedStudentEntities = new List<Student>();
        
        _studentRepositoryMock.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(expectedStudentEntities);
        _mapperMock.Setup(m => m.Map<IReadOnlyCollection<StudentDto>>(expectedStudentEntities))
            .Returns(new List<StudentDto>());

        // Act
        var result = await _studentService.GetAllStudentsAsync();
    
        // Assert
        result.Should().BeEmpty();
        _mapperMock.Verify(m => m.Map<IReadOnlyCollection<StudentDto>>(expectedStudentEntities), Times.Once);
        _studentRepositoryMock.Verify(repo => repo.GetAllAsync(), Times.Once);
    }
    
    [Fact]
    public async Task CreateStudentAsync_WithValidRequest_ShouldReturnCreatedStudentDto()
    {
        // Arrange
        var request = new CreateStudentRequest
        {
            FirstName = "John",
            LastName = "Doe",
            MiddleName = "Smith",
            Age = 20,
            Group = "Group 1",
            UserId = Guid.NewGuid()
        };

        var studentEntity = new Student
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            MiddleName = request.MiddleName,
            Age = request.Age,
            Group = request.Group,
            CreatedById = request.UserId
        };

        var createdStudentDto = ConvertStudentEntityToDto(studentEntity);

        _mapperMock.Setup(mapper => mapper.Map<Student>(request)).Returns(studentEntity);
        _studentRepositoryMock.Setup(repo => repo.InsertAsync(studentEntity))
            .ReturnsAsync(studentEntity);
        _mapperMock.Setup(mapper => mapper.Map<StudentDto>(studentEntity)).Returns(createdStudentDto);

        // Act
        var result = await _studentService.CreateStudentAsync(request);

        // Assert
        result.Should().BeEquivalentTo(createdStudentDto);
        _mapperMock.Verify(mapper => mapper.Map<Student>(request), Times.Once);
        _studentRepositoryMock.Verify(repo => repo.InsertAsync(studentEntity), Times.Once);
        _mapperMock.Verify(mapper => mapper.Map<StudentDto>(studentEntity), Times.Once);
    }
    
    [Fact]
    public async Task UpdateStudentAsync_WithValidRequest_ShouldReturnTrue()
    {
        // Arrange
        var request = new UpdateStudentRequest
        {
            Id = Guid.NewGuid(),
            FirstName = "John",
            LastName = "Doe",
            MiddleName = "Smith",
            Age = 20,
            Group = "Group 1",
            UserId = Guid.NewGuid()
        };

        var studentEntity = new Student
        {
            Id = request.Id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            MiddleName = request.MiddleName,
            Age = request.Age,
            Group = request.Group,
            ModifiedById = request.UserId
        };

        _mapperMock.Setup(mapper => mapper.Map<Student>(request)).Returns(studentEntity);
        _studentRepositoryMock.Setup(repo => repo.UpdateAsync(studentEntity)).ReturnsAsync(true);

        // Act
        var result = await _studentService.UpdateStudentAsync(request);

        // Assert
        result.Should().BeTrue();
        _mapperMock.Verify(mapper => mapper.Map<Student>(request), Times.Once);
        _studentRepositoryMock.Verify(repo => repo.UpdateAsync(studentEntity), Times.Once);
    }
    
    [Fact]
    public async Task DeleteStudentAsync_WithValidId_ShouldReturnTrue()
    {
        // Arrange
        var studentId = Guid.NewGuid();

        _studentRepositoryMock.Setup(repo => repo.DeleteAsync(studentId)).ReturnsAsync(true);

        // Act
        var result = await _studentService.DeleteStudentAsync(studentId);

        // Assert
        result.Should().BeTrue();
        _studentRepositoryMock.Verify(repo => repo.DeleteAsync(studentId), Times.Once);
    }

    private List<Student> GenerateTestStudentEntities()
    {
        var students = new List<Student>()
        {
            new()
            {
                Id = Guid.NewGuid(),
                FirstName = "FirstName 1",
                LastName = "LastName 1",
                MiddleName = "MiddleName 1",
                Group = "Group 1",
                Age = 20,
                CreatedById = Guid.NewGuid(),
            },
            new()
            {
                Id = Guid.NewGuid(),
                FirstName = "FirstName 2",
                LastName = "LastName 2",
                MiddleName = "MiddleName 2",
                Group = "Group 2",
                Age = 21,
                CreatedById = Guid.NewGuid(),
                ModifiedById = Guid.NewGuid(),
            },
            new()
            {
                Id = Guid.NewGuid(),
                FirstName = "FirstName 3",
                LastName = "LastName 3",
                MiddleName = "MiddleName 3",
                Group = "Group 3",
                Age = 22,
                CreatedById = Guid.NewGuid(),
                ModifiedById = Guid.NewGuid(),
            },
        };

        return students;
    }

    private List<StudentDto> ConvertStudentEntitiesToDtos(List<Student> students)
    {
        var studentDtos = new List<StudentDto>();

        foreach (var student in students)
        {
            var studentDto = ConvertStudentEntityToDto(student);

            studentDtos.Add(studentDto);
        }

        return studentDtos;
    }

    private StudentDto ConvertStudentEntityToDto(Student student)
    {
        var studentDto = new StudentDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            MiddleName = student.MiddleName,
            Age = student.Age,
            Group = student.Group,
            UserId = student.ModifiedById ?? student.CreatedById
        };

        return studentDto;
    }
}