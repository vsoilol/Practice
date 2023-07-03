using Microsoft.EntityFrameworkCore;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.DataAccess;

internal class ApplicationDbContext : DbContext, IDbContext
{
    public DbSet<User> Users { get; set; } = null!;

    public DbSet<Role> Roles { get; set; } = null!;

    public DbSet<VersionInfo> VersionInfos { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}