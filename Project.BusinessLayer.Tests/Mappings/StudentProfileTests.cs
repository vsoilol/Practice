using AutoMapper;
using FluentAssertions;
using Project.BusinessLayer.Mappings;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Student;
using Xunit;

namespace Project.BusinessLayer.Tests.Mappings;

public class StudentProfileTests
{
    private readonly IMapper _mapper;

    public StudentProfileTests()
    {
        var config = new MapperConfiguration(
            cfg => { cfg.AddProfile(new StudentProfile()); });
        _mapper = new Mapper(config);
    }
    
    [Fact]
    public void ConvertStudentToStudentDto_ShouldMapUserIdCorrectly_WhenModifiedByIdIsNull()
    {
        // Arrange
        var student = new Student
        {
            Id = Guid.NewGuid(),
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20,
            CreatedById = Guid.NewGuid(),
            ModifiedById = null
        };

        // Act
        var mappedDto = _mapper.Map<StudentDto>(student);

        // Assert
        mappedDto.Should().NotBeNull();
        Assert.Equal(student.Id, mappedDto.Id);
        Assert.Equal(student.FirstName, mappedDto.FirstName);
        Assert.Equal(student.LastName, mappedDto.LastName);
        Assert.Equal(student.MiddleName, mappedDto.MiddleName);
        Assert.Equal(student.Group, mappedDto.Group);
        Assert.Equal(student.Age, mappedDto.Age);
        Assert.Equal(student.CreatedById, mappedDto.UserId);
    }
    
    [Fact]
    public void ConvertStudentToStudentDto_ShouldMapUserIdCorrectly_WhenModifiedByIdIsNotNull()
    {
        // Arrange
        var student = new Student
        {
            Id = Guid.NewGuid(),
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20,
            CreatedById = Guid.NewGuid(),
            ModifiedById = Guid.NewGuid()
        };

        // Act
        var mappedDto = _mapper.Map<StudentDto>(student);

        // Assert
        mappedDto.Should().NotBeNull();
        Assert.Equal(student.Id, mappedDto.Id);
        Assert.Equal(student.FirstName, mappedDto.FirstName);
        Assert.Equal(student.LastName, mappedDto.LastName);
        Assert.Equal(student.MiddleName, mappedDto.MiddleName);
        Assert.Equal(student.Group, mappedDto.Group);
        Assert.Equal(student.Age, mappedDto.Age);
        Assert.Equal(student.ModifiedById, mappedDto.UserId);
    }
    
    [Fact]
    public void ConvertCreateStudentRequestToStudent_ShouldMapCreatedByIdCorrectly()
    {
        // Arrange
        var request = new CreateStudentRequest
        {
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20,
            UserId = Guid.NewGuid()
        };

        // Act
        var mappedEntity = _mapper.Map<Student>(request);

        // Assert
        mappedEntity.Should().NotBeNull();
        Assert.Equal(Guid.Empty, mappedEntity.Id);
        Assert.Equal(request.FirstName, mappedEntity.FirstName);
        Assert.Equal(request.LastName, mappedEntity.LastName);
        Assert.Equal(request.MiddleName, mappedEntity.MiddleName);
        Assert.Equal(request.Group, mappedEntity.Group);
        Assert.Equal(request.Age, mappedEntity.Age);
        Assert.Equal(request.UserId, mappedEntity.CreatedById);
    }
    
    [Fact]
    public void ConvertUpdateStudentRequestToStudent_ShouldMapModifiedByIdCorrectly()
    {
        // Arrange
        var request = new UpdateStudentRequest
        {
            Id = Guid.NewGuid(),
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20,
            UserId = Guid.NewGuid()
        };

        // Act
        var mappedEntity = _mapper.Map<Student>(request);

        // Assert
        mappedEntity.Should().NotBeNull();
        Assert.Equal(request.Id, mappedEntity.Id);
        Assert.Equal(request.FirstName, mappedEntity.FirstName);
        Assert.Equal(request.LastName, mappedEntity.LastName);
        Assert.Equal(request.MiddleName, mappedEntity.MiddleName);
        Assert.Equal(request.Group, mappedEntity.Group);
        Assert.Equal(request.Age, mappedEntity.Age);
        Assert.Equal(request.UserId, mappedEntity.ModifiedById);
    }
}