using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.WorkingDayRepositories;

public interface IWorkingDayRepository
{
    Task<List<WorkingDay>> GetAllByTeacherIdAsync(Guid teacherId);

    Task<WorkingDay?> GetByTeacherIdAndDateAsync(Guid teacherId, DateTime date);
}