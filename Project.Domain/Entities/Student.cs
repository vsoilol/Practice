using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table(nameof(Student))]
public class Student : Entity
{
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public int Age { get; set; }

    public string Group { get; set; } = null!;
    
    //public ICollection<ExamStudent> ExamStudents { get; set; } = null!;
}