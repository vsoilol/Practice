using Microsoft.AspNetCore.Mvc;
using Project.BusinessLayer.Services.TeacherServices;
using Project.Domain.DTOs;
using Project.Domain.Requests.Teacher;

namespace Project.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeacherController : ControllerBase
{
    private readonly ITeacherService _teacherService;

    public TeacherController(ITeacherService teacherService)
    {
        _teacherService = teacherService;
    }

    [HttpGet]
    public Task<IReadOnlyCollection<TeacherDto>> GetAllTeachersAsync()
    {
        return _teacherService.GetAllTeachersAsync();
    }

    [HttpGet("{date}")]
    public Task<IReadOnlyCollection<TeacherDto>> GetAllByWorkingDayDateWithoutExamAsync([FromRoute] DateTime date)
    {
        return _teacherService.GetAllByWorkingDayDateWithoutExamAsync(date);
    }

    [HttpPost]
    public Task<TeacherDto> CreateTeacherAsync([FromBody] CreateTeacherRequest request)
    {
        return _teacherService.CreateTeacherAsync(request);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateTeacherAsync([FromBody] UpdateTeacherRequest request)
    {
        var isUpdate = await _teacherService.UpdateTeacherAsync(request);

        return isUpdate ? Ok() : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTeacherAsync([FromRoute] Guid id)
    {
        var isDelete = await _teacherService.DeleteTeacherAsync(id);

        return isDelete ? Ok() : BadRequest();
    }

    [HttpPut("workingDays")]
    public async Task<ActionResult> UpdateTeacherWorkingDaysAsync([FromBody] UpdateTeacherWorkingDaysRequest request)
    {
        var isUpdate = await _teacherService.UpdateTeacherWorkingDaysAsync(request);

        return isUpdate ? Ok() : BadRequest();
    }
}