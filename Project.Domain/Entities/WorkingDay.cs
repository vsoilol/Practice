using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(WorkingDay))]
public class WorkingDay : Entity
{
    public DateTime Date { get; set; }
    
    public Guid TeacherId { get; set; }

    [ForeignKey(nameof(TeacherId))]
    public Teacher Teacher { get; set; } = null!;
    
    public Exam? Exam { get; set; }
}