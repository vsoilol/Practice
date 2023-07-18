namespace Project.Domain.Requests.Teacher;

public class CreateTeacherRequest
{
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;
}