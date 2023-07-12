using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(Subject))]
public class Subject : Entity
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public ICollection<Exam> Exams { get; set; } = null!;
}