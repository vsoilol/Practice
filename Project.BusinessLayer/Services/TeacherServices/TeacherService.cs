using AutoMapper;
using Project.DataAccessLayer.Repositories.TeacherRepositories;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.Teacher;

namespace Project.BusinessLayer.Services.TeacherServices;

public class TeacherService : ITeacherService
{
    private readonly IMapper _mapper;
    private readonly ITeacherRepository _teacherRepository;

    public TeacherService(IMapper mapper, ITeacherRepository teacherRepository)
    {
        _mapper = mapper;
        _teacherRepository = teacherRepository;
    }

    public async Task<IReadOnlyCollection<TeacherDto>> GetAllTeachersAsync()
    {
        var teacherEntities = await _teacherRepository.GetAllAsync();

        var mappedTeachers = _mapper.Map<IReadOnlyCollection<TeacherDto>>(teacherEntities);

        return mappedTeachers;
    }

    public async Task<TeacherDto> CreateTeacherAsync(CreateTeacherRequest request)
    {
        var teacherEntity = _mapper.Map<Teacher>(request);

        var createdTeacherEntity = await _teacherRepository.InsertAsync(teacherEntity);

        return _mapper.Map<TeacherDto>(createdTeacherEntity);
    }

    public Task<bool> UpdateTeacherAsync(UpdateTeacherRequest request)
    {
        var teacherEntity = _mapper.Map<Teacher>(request);
        return _teacherRepository.UpdateAsync(teacherEntity);
    }

    public Task<bool> DeleteTeacherAsync(Guid id)
    {
        return _teacherRepository.DeleteAsync(id);
    }

    public Task<bool> UpdateTeacherWorkingDaysAsync(UpdateTeacherWorkingDaysRequest request)
    {
        return _teacherRepository.UpdateTeacherWorkingDaysAsync(request.TeacherId, request.Dates);
    }

    public async Task<IReadOnlyCollection<TeacherDto>> GetAllByWorkingDayDateWithoutExamAsync(DateTime date)
    {
        var teacherEntities = await _teacherRepository.GetAllByWorkingDayDateWithoutExamAsync(date);

        var mappedTeachers = _mapper.Map<IReadOnlyCollection<TeacherDto>>(teacherEntities);

        return mappedTeachers;
    }
}