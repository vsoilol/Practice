﻿using Project.Domain.DTOs;
using Project.Domain.Requests.Student;

namespace Project.BusinessLayer.Services.StudentServices;

public interface IStudentService
{
    Task<IReadOnlyCollection<StudentDto>> GetAllStudentsAsync();
    
    Task<StudentDto> CreateStudentAsync(CreateStudentRequest request);
    
    Task<bool> UpdateStudentAsync(UpdateStudentRequest request);

    Task<bool> DeleteStudentAsync(Guid id);

    Task<IReadOnlyCollection<StudentDto>> GetAllStudentsByExamIdAsync(Guid examId);
}