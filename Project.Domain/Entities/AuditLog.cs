using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(AuditLog))]
public class AuditLog : Entity
{
    public Guid? UserId { get; set; }
    
    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    public string AuditType { get; set; } = Enums.AuditType.None.ToString();

    public string TableName { get; set; } = null!;

    public DateTime DateTime { get; set; }

    public string? OldValues { get; set; }

    public string? NewValues { get; set; }

    public string? AffectedColumns { get; set; }

    public string? PrimaryKey { get; set; }
}