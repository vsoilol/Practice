namespace Project.Domain.Requests.Subject;

public class CreateSubjectRequest
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
}