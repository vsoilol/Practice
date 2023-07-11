using Microsoft.AspNetCore.Mvc;
using Project.BusinessLayer.Services.StudentServices;
using Project.Domain.DTOs;
using Project.Domain.Requests.Student;

namespace Project.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentController(IStudentService studentService)
    {
        _studentService = studentService;
    }
    
    [HttpGet]
    public Task<IReadOnlyCollection<StudentDto>> GetAllStudentsAsync()
    {
        return _studentService.GetAllStudentsAsync();
    }
    
    [HttpPost]
    public Task<StudentDto> CreateUserAsync([FromBody] CreateStudentRequest request)
    {
        return _studentService.CreateStudentAsync(request);
    }
    
    [HttpPut]
    public async Task<ActionResult> CreateUserAsync([FromBody] UpdateStudentRequest request)
    {
        var isUpdate = await _studentService.UpdateStudentAsync(request);

        return isUpdate ? Ok() : BadRequest();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> CreateUserAsync([FromRoute] Guid id)
    {
        var isDelete = await _studentService.DeleteStudentAsync(id);

        return isDelete ? Ok() : BadRequest();
    }
}