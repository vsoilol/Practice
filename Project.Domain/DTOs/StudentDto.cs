namespace Project.Domain.DTOs;

public class StudentDto
{
    public Guid Id { get; set; }
    
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public int Age { get; set; }

    public string Group { get; set; } = null!;

    public Guid UserId { get; set; }
}