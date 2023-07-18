using System.Reflection;

namespace Project.Domain.Exceptions;

public class EntityNotFoundException : Exception
{
    public EntityNotFoundException(MemberInfo type)
        : base($"Cannot find entity {type.Name}")
    {
    }
}