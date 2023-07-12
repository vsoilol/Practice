using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(Teacher))]
public class Teacher : Entity
{
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public ICollection<WorkingDay> WorkingDays { get; set; } = null!;
}