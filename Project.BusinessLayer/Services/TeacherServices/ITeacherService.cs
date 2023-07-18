using Project.Domain.DTOs;
using Project.Domain.Requests.Teacher;

namespace Project.BusinessLayer.Services.TeacherServices;

public interface ITeacherService
{
    Task<IReadOnlyCollection<TeacherDto>> GetAllTeachersAsync();
    
    Task<TeacherDto> CreateTeacherAsync(CreateTeacherRequest request);
    
    Task<bool> UpdateTeacherAsync(UpdateTeacherRequest request);

    Task<bool> DeleteTeacherAsync(Guid id);

    Task<bool> UpdateTeacherWorkingDaysAsync(UpdateTeacherWorkingDaysRequest request);
    
    Task<IReadOnlyCollection<TeacherDto>> GetAllTeachersByWorkingDayDateAsync(DateTime date);
}