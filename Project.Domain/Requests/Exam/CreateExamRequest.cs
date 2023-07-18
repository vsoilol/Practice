namespace Project.Domain.Requests.Exam;

public class CreateExamRequest
{
    public Guid SubjectId { get; set; }
    
    public Guid TeacherId { get; set; }

    public DateTime Date { get; set; }

    public Guid[] StudentIds { get; set; } = null!;
}