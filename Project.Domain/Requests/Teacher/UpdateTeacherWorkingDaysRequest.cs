namespace Project.Domain.Requests.Teacher;

public class UpdateTeacherWorkingDaysRequest
{
    public Guid TeacherId { get; set; }

    public DateTime[] Dates { get; set; } = null!;
}