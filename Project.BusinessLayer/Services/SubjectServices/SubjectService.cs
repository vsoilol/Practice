using AutoMapper;
using Project.DataAccessLayer.Repositories.SubjectRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Subject;

namespace Project.BusinessLayer.Services.SubjectServices;

public class SubjectService : ISubjectService
{
    private readonly IMapper _mapper;
    private readonly ISubjectRepository _subjectRepository;

    public SubjectService(IMapper mapper, ISubjectRepository subjectRepository)
    {
        _mapper = mapper;
        _subjectRepository = subjectRepository;
    }

    public async Task<IReadOnlyCollection<SubjectDto>> GetAllSubjectsAsync()
    {
        var subjectEntities = await _subjectRepository.GetAllAsync();

        var mappedSubjects = _mapper
            .Map<IReadOnlyCollection<SubjectDto>>(subjectEntities);

        return mappedSubjects;
    }

    public async Task<SubjectDto> CreateSubjectAsync(CreateSubjectRequest request)
    {
        var subjectEntity = _mapper.Map<Subject>(request);

        var createdSubjectEntity = await _subjectRepository.InsertAsync(subjectEntity);

        return _mapper.Map<SubjectDto>(createdSubjectEntity);
    }

    public Task<bool> UpdateSubjectAsync(UpdateSubjectRequest request)
    {
        var subjectEntity = _mapper.Map<Subject>(request);
        return _subjectRepository.UpdateAsync(subjectEntity);
    }

    public Task<bool> DeleteSubjectAsync(Guid id)
    {
        return _subjectRepository.DeleteAsync(id);
    }
}