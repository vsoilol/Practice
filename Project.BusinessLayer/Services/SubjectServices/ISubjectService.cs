using Project.Domain.DTOs;
using Project.Domain.Requests.Subject;

namespace Project.BusinessLayer.Services.SubjectServices;

public interface ISubjectService
{
    Task<IReadOnlyCollection<SubjectDto>> GetAllSubjectsAsync();
    
    Task<SubjectDto> CreateSubjectAsync(CreateSubjectRequest request);
    
    Task<bool> UpdateSubjectAsync(UpdateSubjectRequest request);

    Task<bool> DeleteSubjectAsync(Guid id);
}