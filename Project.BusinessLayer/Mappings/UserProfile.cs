using AutoMapper;
using Project.Domain.DTOs;
using Project.Domain.Entities;
using Project.Domain.Requests.User;

namespace Project.BusinessLayer.Mappings;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>().ForMember(dto => dto.Roles,
            entity => entity
                .MapFrom(s => s.Roles.Select(_ => _.Name).ToArray()));
        CreateMap<CreateUserRequest, User>();
    }
}