using Microsoft.EntityFrameworkCore;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.DataAccess;

public interface IDbContext
{
    DbSet<User> Users { get; set; }
    
    DbSet<Role> Roles { get; set; }
    
    DbSet<VersionInfo> VersionInfos { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}