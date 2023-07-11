using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.DataAccess;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.UserRepositories;

internal class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAllWithRolesAsync()
    {
        var users = await _context.Users
            .AsNoTracking()
            .Include(_ => _.Roles)
            .ToListAsync();

        return users;
    }

    public async Task<User> InsertAsync(User entity)
    {
        var createdUserEntity = _context.Users.Add(entity).Entity;
        await _context.SaveChangesAsync();

        return createdUserEntity;
    }
}