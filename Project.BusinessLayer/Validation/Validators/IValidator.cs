using Project.BusinessLayer.Validation.Models;

namespace Project.BusinessLayer.Validation.Validators;

public interface IValidator<in T>
{
    Task<ValidationResult> IsInstanceValidAsync(T instance);
}