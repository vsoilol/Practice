using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(Role))]
public class Role : Entity
{
    public string Name { get; set; } = null!;
    
    public string NormalizedName { get; set; } = null!;

    public ICollection<User> Users { get; set; } = null!;
}