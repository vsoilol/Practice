using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table("Student")]
public class Student : AuditableEntity
{
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public int Age { get; set; }

    public string Group { get; set; } = null!;
}