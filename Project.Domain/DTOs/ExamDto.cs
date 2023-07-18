namespace Project.Domain.DTOs;

public class ExamDto
{
    public Guid Id { get; set; }

    public DateTime Date { get; set; }

    public TeacherDto Teacher { get; set; } = null!;

    public SubjectBriefDto Subject { get; set; } = null!;
}