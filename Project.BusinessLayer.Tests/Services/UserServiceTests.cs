using AutoMapper;
using FluentAssertions;
using Moq;
using Project.BusinessLayer.Services.UserServices;
using Project.DataAccessLayer.Repositories.UserRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.User;
using Xunit;

namespace Project.BusinessLayer.Tests.Services;

public class UserServiceTests
{
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly UserService _userService;

    public UserServiceTests()
    {
        _mapperMock = new Mock<IMapper>();
        _userRepositoryMock = new Mock<IUserRepository>();
        _userService = new UserService(_mapperMock.Object, _userRepositoryMock.Object);
    }

    [Fact]
    public async Task GetAllUsersAsync_ShouldReturnAllUsers()
    {
        // Arrange
        var expectedUsers = GenerateTestUsers();

        var expectedUserDtos = ConvertUsersToDtos(expectedUsers);

        _userRepositoryMock.Setup(repo => repo.GetAllWithRolesAsync())
            .ReturnsAsync(expectedUsers);
        _mapperMock.Setup(m => m.Map<IReadOnlyCollection<UserDto>>(expectedUsers))
            .Returns(expectedUserDtos);

        // Act
        var result = await _userService.GetAllUsersAsync();

        // Assert
        result.Should().Equal(expectedUserDtos);
        _mapperMock.Verify(m => m.Map<IReadOnlyCollection<UserDto>>(expectedUsers), Times.Once);
        _userRepositoryMock.Verify(repo => repo.GetAllWithRolesAsync(), Times.Once);
    }
    
    [Fact]
    public async Task GetAllUsersAsync_ShouldReturnEmptyCollection_WhenNoUsersExist()
    {
        // Arrange
        var expectedUsers = new List<User>();
        
        _userRepositoryMock.Setup(repo => repo.GetAllWithRolesAsync())
            .ReturnsAsync(expectedUsers);
        _mapperMock.Setup(m => m.Map<IReadOnlyCollection<UserDto>>(expectedUsers))
            .Returns(new List<UserDto>());

        // Act
        var result = await _userService.GetAllUsersAsync();
    
        // Assert
        result.Should().BeEmpty();
        _mapperMock.Verify(m => m.Map<IReadOnlyCollection<UserDto>>(expectedUsers), Times.Once);
        _userRepositoryMock.Verify(repo => repo.GetAllWithRolesAsync(), Times.Once);
    }
    
    [Fact]
    public async Task CreateUserAsync_ShouldCreateUserAndReturnUserDto()
    {
        // Arrange
        var createUserRequest = new CreateUserRequest
        {
            FirstName = "John",
            LastName = "Doe",
            MiddleName = "Smith",
            Age = 25
        };
        var createdUser = new User
        {
            Id = Guid.NewGuid(),
            FirstName = createUserRequest.FirstName,
            LastName = createUserRequest.LastName,
            MiddleName = createUserRequest.MiddleName,
            Age = createUserRequest.Age,
            Roles = new List<Role>()
        };
        var expectedUserDto = ConvertUserEntityToDto(createdUser);

        _mapperMock.Setup(m => m.Map<User>(createUserRequest)).Returns(createdUser);
        _userRepositoryMock.Setup(repo => repo.InsertAsync(createdUser)).ReturnsAsync(createdUser);
        _mapperMock.Setup(m => m.Map<UserDto>(createdUser)).Returns(expectedUserDto);

        var userService = new UserService(_mapperMock.Object, _userRepositoryMock.Object);

        // Act
        var result = await userService.CreateUserAsync(createUserRequest);

        // Assert
        result.Should().BeEquivalentTo(expectedUserDto);
        _mapperMock.Verify(m => m.Map<User>(createUserRequest), Times.Once);
        _userRepositoryMock.Verify(repo => repo.InsertAsync(createdUser), Times.Once);
        _mapperMock.Verify(m => m.Map<UserDto>(createdUser), Times.Once);
    }

    private List<User> GenerateTestUsers()
    {
        var users = new List<User>()
        {
            new()
            {
                Id = Guid.NewGuid(),
                FirstName = "John",
                LastName = "Doe",
                MiddleName = "Smith",
                Age = 25,
                Roles = new List<Role>
                {
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    },
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Name = "Manager",
                        NormalizedName = "MANAGER"
                    },
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Name = "User",
                        NormalizedName = "USER"
                    }
                }
            },
            new()
            {
                Id = Guid.NewGuid(),
                FirstName = "Jane",
                LastName = "Smith",
                MiddleName = "Doe",
                Age = 30,
                Roles = new List<Role>()
            }
        };

        return users;
    }

    private List<UserDto> ConvertUsersToDtos(List<User> users)
    {
        var userDtos = new List<UserDto>();

        foreach (var user in users)
        {
            var userDto = ConvertUserEntityToDto(user);
            userDtos.Add(userDto);
        }

        return userDtos;
    }

    private UserDto ConvertUserEntityToDto(User user)
    {
        var userDto = new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            MiddleName = user.MiddleName,
            Age = user.Age,
            Roles = user.Roles.Select(_ => _.Name).ToArray()
        };

        return userDto;
    }
}