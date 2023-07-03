using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.DTOs;
using Project.Domain.Requests.User;

namespace Project.BusinessLayer.Services.User;

internal class UserService : IUserService
{
    private readonly IDbContext _dbContext;
    private readonly IMapper _mapper;

    public UserService(IDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<IReadOnlyCollection<UserDto>> GetAllUsersAsync()
    {
        var users = await _dbContext.Users
            .AsNoTracking()
            .Include(_ => _.Roles)
            .ToListAsync();

        var mapUsers = _mapper.Map<IReadOnlyCollection<UserDto>>(users);

        return mapUsers;
    }

    public async Task<UserDto> CreateUserAsync(CreateUserRequest request)
    {
        var user = _mapper.Map<Domain.Entities.User>(request);

        var createdUser = _dbContext.Users.Add(user).Entity;
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<UserDto>(createdUser);
    }
}