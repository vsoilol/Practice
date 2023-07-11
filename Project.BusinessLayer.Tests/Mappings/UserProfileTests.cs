using AutoMapper;
using FluentAssertions;
using Project.BusinessLayer.Mappings;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.User;
using Xunit;

namespace Project.BusinessLayer.Tests.Mappings;

public class UserProfileTests
{
    private readonly IMapper _mapper;

    public UserProfileTests()
    {
        var config = new MapperConfiguration(
            cfg => { cfg.AddProfile(new UserProfile()); });
        _mapper = new Mapper(config);
    }
    
    [Fact]
    public void CreateMap_UserToUserDto_ShouldMapRolesCorrectly()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "John",
            LastName = "Doe",
            MiddleName = "Smith",
            Age = 25,
            Roles = new List<Role>
            {
                new() { Name = "Admin" },
                new() { Name = "Manager" },
                new() { Name = "User" }
            }
        };

        var roles = user.Roles.Select(_ => _.Name).ToArray();

        // Act
        var mappedDto = _mapper.Map<UserDto>(user);

        // Assert
        mappedDto.Should().NotBeNull();
        mappedDto.Roles.Should().NotBeNull();
        Assert.Equal(user.Id, mappedDto.Id);
        Assert.Equal(user.FirstName, mappedDto.FirstName);
        Assert.Equal(user.LastName, mappedDto.LastName);
        Assert.Equal(user.MiddleName, mappedDto.MiddleName);
        Assert.Equal(user.Age, mappedDto.Age);
        mappedDto.Roles.Should().Equal(roles);
    }
    
    [Fact]
    public void CreateMap_CreateUserRequestToUser_ShouldMapPropertiesCorrectly()
    {
        // Arrange
        var request = new CreateUserRequest
        {
            FirstName = "John",
            LastName = "Doe",
            MiddleName = "Smith",
            Age = 25
        };

        // Act
        var mappedEntity = _mapper.Map<User>(request);

        // Assert
        mappedEntity.Should().NotBeNull();
        Assert.Equal(request.FirstName, mappedEntity.FirstName);
        Assert.Equal(request.LastName, mappedEntity.LastName);
        Assert.Equal(request.MiddleName, mappedEntity.MiddleName);
        Assert.Equal(request.Age, mappedEntity.Age);
    }
}