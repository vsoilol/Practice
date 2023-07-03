namespace Project.Domain.DTOs;

public class UserDto
{
    public Guid Id { get; set; }
    
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public int Age { get; set; }

    public string[] Roles { get; set; } = null!;
}