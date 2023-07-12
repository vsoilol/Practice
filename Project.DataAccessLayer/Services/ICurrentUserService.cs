namespace Project.DataAccessLayer.Services;

public interface ICurrentUserService
{
    Guid? GetCurrentUserId();
}