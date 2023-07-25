using Project.BusinessLayer.Validation.Validators;
using Project.Domain.Exceptions;

namespace Project.BusinessLayer.Validation.Services;

public class ValidationService : IValidationService
{
    private readonly IServiceProvider _serviceProvider;

    public ValidationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public async Task ValidateAsync<T>(T instance)
    {
        var genericType = typeof(IValidator<>).MakeGenericType(typeof(T));

        if (_serviceProvider.GetService(genericType) is not IValidator<T> validator)
        {
            throw new NotSuchValidatorException(typeof(T));
        }
        
        var validationResult = await validator.IsInstanceValidAsync(instance);

        if (validationResult.IsValid)
        {
            return;
        }

        throw new ValidationException(validationResult.Errors!.ToArray());
    }
}