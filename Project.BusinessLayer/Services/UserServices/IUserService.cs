using Project.Domain.DTOs;
using Project.Domain.Requests.User;

namespace Project.BusinessLayer.Services.UserServices;

public interface IUserService
{
    Task<IReadOnlyCollection<UserDto>> GetAllUsersAsync();
    
    Task<UserDto> CreateUserAsync(CreateUserRequest request);
}