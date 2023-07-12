using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(ExamStudent))]
public class ExamStudent
{
    public Guid ExamId { get; set; }
    
    public Guid StudentId { get; set; }

    [ForeignKey(nameof(ExamId))] 
    public Exam Exam { get; set; } = null!;

    [ForeignKey(nameof(StudentId))] 
    public Student Student { get; set; } = null!;
}