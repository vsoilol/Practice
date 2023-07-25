namespace Project.Domain.DTOs;

public class SubjectDto
{
    public Guid Id { get; set; }
    
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
}