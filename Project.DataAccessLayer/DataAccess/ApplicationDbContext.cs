using Microsoft.EntityFrameworkCore;
using Project.DataAccessLayer.Models;
using Project.DataAccessLayer.Services;
using Project.Domain.Entities;
using Project.Domain.Enums;

namespace Project.DataAccessLayer.DataAccess;

internal class ApplicationDbContext : DbContext
{
    private readonly ICurrentUserService _currentUserService;

    public DbSet<User> Users { get; set; } = null!;

    public DbSet<Role> Roles { get; set; } = null!;

    public DbSet<VersionInfo> VersionInfos { get; set; } = null!;

    public DbSet<Student> Students { get; set; } = null!;

    public DbSet<AuditLog> AuditLogs { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ICurrentUserService currentUserService)
        : base(options)
    {
        _currentUserService = currentUserService;
    }

    public override int SaveChanges()
    {
        SaveAuditLog();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        SaveAuditLog();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void SaveAuditLog()
    {
        ChangeTracker.DetectChanges();
        var auditEntries = new List<AuditEntry>();

        var entities = ChangeTracker.Entries()
            .Where(x => x.State != EntityState.Unchanged
                        && x.State != EntityState.Detached)
            .ToList();

        foreach (var entry in entities)
        {
            var userId = _currentUserService.GetCurrentUserId();

            var auditEntry = new AuditEntry
            {
                TableName = entry.Entity.GetType().Name,
                UserId = userId
            };

            auditEntries.Add(auditEntry);

            foreach (var property in entry.Properties)
            {
                var propertyName = property.Metadata.Name;

                if (property.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[propertyName] = property.CurrentValue!;
                    continue;
                }

                switch (entry.State)
                {
                    case EntityState.Added:
                        auditEntry.AuditType = AuditType.Create;
                        auditEntry.NewValues[propertyName] = property.CurrentValue!;
                        break;
                    case EntityState.Deleted:
                        auditEntry.AuditType = AuditType.Delete;
                        auditEntry.OldValues[propertyName] = property.OriginalValue!;
                        break;
                    case EntityState.Modified:
                        if (property.IsModified)
                        {
                            auditEntry.ChangedColumns.Add(propertyName);
                            auditEntry.AuditType = AuditType.Update;
                            auditEntry.OldValues[propertyName] = property.OriginalValue!;
                            auditEntry.NewValues[propertyName] = property.CurrentValue!;
                        }

                        break;
                }
            }
        }

        foreach (var auditEntry in auditEntries)
        {
            AuditLogs.Add(auditEntry.ToAudit());
        }
    }
}