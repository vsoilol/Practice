using Project.Domain.DTOs;

namespace Project.BusinessLayer.Services.WorkingDayServices;

public interface IWorkingDayService
{
    Task<IReadOnlyCollection<WorkingDayDto>> GetAllDaysByTeacherIdAsync(Guid teacherId);
}