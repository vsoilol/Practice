using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(Exam))]
public class Exam : Entity
{
    public Guid SubjectId { get; set; }

    [ForeignKey(nameof(SubjectId))] 
    public Subject Subject { get; set; } = null!;

    public Guid TeacherWorkingDayId { get; set; }

    [ForeignKey(nameof(TeacherWorkingDayId))]
    public WorkingDay TeacherWorkingDay { get; set; } = null!;

    public ICollection<ExamStudent> ExamStudents { get; set; } = null!;
}