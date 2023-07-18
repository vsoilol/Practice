using Microsoft.AspNetCore.Mvc;
using Project.BusinessLayer.Services.ExamServices;
using Project.Domain.DTOs;
using Project.Domain.Requests.Exam;

namespace Project.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamController : ControllerBase
{
    private readonly IExamService _examService;

    public ExamController(IExamService examService)
    {
        _examService = examService;
    }
    
    [HttpGet]
    public Task<IReadOnlyCollection<ExamDto>> GetAllExamsAsync()
    {
        return _examService.GetAllExamsAsync();
    }
    
    [HttpPost]
    public Task<ExamDto> CreateExamAsync([FromBody] CreateExamRequest request)
    {
        return _examService.CreateExamAsync(request);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateExamAsync([FromBody] UpdateExamRequest request)
    {
        var isUpdate = await _examService.UpdateExamAsync(request);

        return isUpdate ? Ok() : BadRequest();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteExamAsync([FromRoute] Guid id)
    {
        var isDelete = await _examService.DeleteExamAsync(id);

        return isDelete ? Ok() : BadRequest();
    }
}