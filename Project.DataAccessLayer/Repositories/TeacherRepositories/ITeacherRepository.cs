using Project.Domain.Entities;

namespace Project.DataAccessLayer.Repositories.TeacherRepositories;

public interface ITeacherRepository
{
    Task<List<Teacher>> GetAllAsync();
    
    Task<Teacher> InsertAsync(Teacher entity);
    
    Task<bool> UpdateAsync(Teacher entity);

    Task<bool> DeleteAsync(Guid id);

    Task<bool> UpdateTeacherWorkingDaysAsync(Guid teacherId, IEnumerable<DateTime> dates);
    
    Task<List<Teacher>> GetAllByWorkingDayDateAsync(DateTime date);
}