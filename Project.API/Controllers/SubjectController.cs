using Microsoft.AspNetCore.Mvc;
using Project.BusinessLayer.Services.SubjectServices;
using Project.Domain.DTOs;
using Project.Domain.Requests.Subject;

namespace Project.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubjectController : ControllerBase
{
    private readonly ISubjectService _subjectService;

    public SubjectController(ISubjectService subjectService)
    {
        _subjectService = subjectService;
    }
    
    [HttpGet]
    public Task<IReadOnlyCollection<SubjectDto>> GetAllSubjectsAsync()
    {
        return _subjectService.GetAllSubjectsAsync();
    }
    
    [HttpPost]
    public Task<SubjectDto> CreateSubjectAsync([FromBody] CreateSubjectRequest request)
    {
        return _subjectService.CreateSubjectAsync(request);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateSubjectAsync([FromBody] UpdateSubjectRequest request)
    {
        var isUpdate = await _subjectService.UpdateSubjectAsync(request);

        return isUpdate ? Ok() : BadRequest();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSubjectAsync([FromRoute] Guid id)
    {
        var isDelete = await _subjectService.DeleteSubjectAsync(id);

        return isDelete ? Ok() : BadRequest();
    }
}