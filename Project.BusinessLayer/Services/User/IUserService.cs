using Project.Domain.DTOs;
using Project.Domain.Requests.User;

namespace Project.BusinessLayer.Services.User;

public interface IUserService
{
    Task<IReadOnlyCollection<UserDto>> GetAllUsersAsync();
    
    Task<UserDto> CreateUserAsync(CreateUserRequest request);
}