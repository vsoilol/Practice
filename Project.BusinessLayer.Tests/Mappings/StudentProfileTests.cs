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
    public void ConvertStudentToStudentDto_ShouldMapCorrectly()
    {
        // Arrange
        var student = new Student
        {
            Id = Guid.NewGuid(),
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20
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
    }

    [Fact]
    public void ConvertCreateStudentRequestToStudent_ShouldMapCorrectly()
    {
        // Arrange
        var request = new CreateStudentRequest
        {
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20
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
    }
    
    [Fact]
    public void ConvertUpdateStudentRequestToStudent_ShouldMapCorrectly()
    {
        // Arrange
        var request = new UpdateStudentRequest
        {
            Id = Guid.NewGuid(),
            FirstName = "FirstName",
            LastName = "LastName",
            MiddleName = "MiddleName",
            Group = "Group",
            Age = 20
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
    }
}