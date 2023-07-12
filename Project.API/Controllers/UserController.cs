using Microsoft.AspNetCore.Mvc;
using Project.BusinessLayer.Services.UserServices;
using Project.Domain.DTOs;
using Project.Domain.Requests.User;

namespace Project.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public Task<IReadOnlyCollection<UserDto>> GetAllUsersAsync()
    {
        return _userService.GetAllUsersAsync();
    }
    
    [HttpPost]
    public Task<UserDto> CreateUserAsync([FromBody] CreateUserRequest request)
    {
        return _userService.CreateUserAsync(request);
    }
}