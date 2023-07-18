using Microsoft.AspNetCore.Mvc;
using Project.BusinessLayer.Services.WorkingDayServices;
using Project.Domain.DTOs;

namespace Project.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkingDayController : ControllerBase
{
    private readonly IWorkingDayService _workingDayService;

    public WorkingDayController(IWorkingDayService workingDayService)
    {
        _workingDayService = workingDayService;
    }

    [HttpGet("{teacherId}")]
    public Task<IReadOnlyCollection<WorkingDayDto>> GetAllDaysByTeacherIdAsync([FromRoute] Guid teacherId)
    {
        return _workingDayService.GetAllDaysByTeacherIdAsync(teacherId);
    }
}