using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table("User")]
public class User : Entity
{
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public int Age { get; set; }
    
    public ICollection<Role> Roles { get; set; } = null!;
}