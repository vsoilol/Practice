using Microsoft.EntityFrameworkCore;
using Project.Domain.Entities;

namespace Project.DataAccessLayer.DataAccess;

internal class ApplicationDbContext : DbContext, IDbContext
{
    public DbSet<User> Users { get; set; } = null!;

    public DbSet<Role> Roles { get; set; } = null!;

    public DbSet<VersionInfo> VersionInfos { get; set; } = null!;

    public DbSet<Student> Students { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public Task<int> SaveChangesAuditableEntitiesAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var now = DateTime.Now;

        ChangeTracker.Entries<AuditableEntity>().ToList()
            .ForEach(x =>
            {
                switch (x.State)
                {
                    case EntityState.Added:
                        x.Entity.CreatedById = userId;
                        x.Entity.CreatedAt = now;
                        break;
                    case EntityState.Modified:
                        x.Entity.ModifiedById = userId;
                        x.Entity.ModifiedAt = now;
                        break;
                }
            });

        return base.SaveChangesAsync(cancellationToken);
    }
}