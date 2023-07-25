namespace Project.Domain.Requests.Subject;

public class UpdateSubjectRequest
{
    public Guid Id { get; set; }
    
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
}