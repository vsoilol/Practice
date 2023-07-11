using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.UserRepositories;

public interface IUserRepository
{
    Task<List<User>> GetAllWithRolesAsync();
    
    Task<User> InsertAsync(User entity);
}