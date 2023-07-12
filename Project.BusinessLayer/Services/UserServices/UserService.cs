using AutoMapper;
using Project.DataAccessLayer.Repositories.UserRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.User;

namespace Project.BusinessLayer.Services.UserServices;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IMapper mapper, IUserRepository userRepository)
    {
        _mapper = mapper;
        _userRepository = userRepository;
    }

    public async Task<IReadOnlyCollection<UserDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllWithRolesAsync();

        var mapUsers = _mapper.Map<IReadOnlyCollection<UserDto>>(users);

        return mapUsers;
    }

    public async Task<UserDto> CreateUserAsync(CreateUserRequest request)
    {
        var user = _mapper.Map<User>(request);

        var createdUser = await _userRepository.InsertAsync(user);

        return _mapper.Map<UserDto>(createdUser);
    }
}