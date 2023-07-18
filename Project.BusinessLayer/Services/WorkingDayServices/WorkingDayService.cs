using AutoMapper;
using Project.DataAccessLayer.Repositories.WorkingDayRepositories;
using Project.Domain.DTOs;

namespace Project.BusinessLayer.Services.WorkingDayServices;

public class WorkingDayService : IWorkingDayService
{
    private readonly IMapper _mapper;
    private readonly IWorkingDayRepository _workingDayRepository;

    public WorkingDayService(IMapper mapper, IWorkingDayRepository workingDayRepository)
    {
        _mapper = mapper;
        _workingDayRepository = workingDayRepository;
    }

    public async Task<IReadOnlyCollection<WorkingDayDto>> GetAllDaysByTeacherIdAsync(Guid teacherId)
    {
        var workingDayEntities = await _workingDayRepository.GetAllByTeacherIdAsync(teacherId);

        var mappedWorkingDays = _mapper
            .Map<IReadOnlyCollection<WorkingDayDto>>(workingDayEntities);

        return mappedWorkingDays;
    }
}