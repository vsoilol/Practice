using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

public abstract class AuditableEntity : Entity
{
    public DateTime CreatedAt { get; set; }
    
    public Guid CreatedById { get; set; }

    [ForeignKey(nameof(CreatedById))] 
    public User CreatedByUser { get; set; } = null!;

    public DateTime? ModifiedAt { get; set; }

    public Guid? ModifiedById { get; set; }

    [ForeignKey(nameof(ModifiedById))]
    public User? ModifiedByUser { get; set; }
}