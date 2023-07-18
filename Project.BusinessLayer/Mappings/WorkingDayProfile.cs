using AutoMapper;
using Project.Domain.DTOs;
using Project.Domain.Entities;

namespace Project.BusinessLayer.Mappings;

public class WorkingDayProfile : Profile
{
    public WorkingDayProfile()
    {
        CreateMap<WorkingDay, WorkingDayDto>();
    }
}