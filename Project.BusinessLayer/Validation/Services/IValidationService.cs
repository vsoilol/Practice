namespace Project.BusinessLayer.Validation.Services;

public interface IValidationService
{
    Task ValidateAsync<T>(T instance);
}