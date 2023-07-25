namespace Project.Domain.Requests.Teacher;

public class UpdateTeacherRequest
{
    public Guid Id { get; set; }
    
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;
}