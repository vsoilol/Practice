﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Project.API.Models;
using Project.Domain.Exceptions;

namespace Project.API.Filters;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

    public ApiExceptionFilterAttribute()
    {
        _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
        {
            { typeof(EntityNotFoundException), HandleEntityNotFoundException },
        };
    }

    public override void OnException(ExceptionContext context)
    {
        HandleException(context);

        base.OnException(context);
    }

    private void HandleException(ExceptionContext context)
    {
        var type = context.Exception.GetType();

        if (_exceptionHandlers.ContainsKey(type))
        {
            _exceptionHandlers[type].Invoke(context);
            return;
        }

        HandleUnknownException(context);
    }

    private void HandleEntityNotFoundException(ExceptionContext context)
    {
        var exception = (EntityNotFoundException)context.Exception;

        var badRequest = new CustomBadRequestResult
        {
            Title = "Bad Request",
            Errors = exception.Message,
            StatusCode = StatusCodes.Status400BadRequest
        };

        context.Result = new ObjectResult(badRequest)
        {
            StatusCode = StatusCodes.Status400BadRequest,
        };

        context.ExceptionHandled = true;
    }

    private void HandleUnknownException(ExceptionContext context)
    {
        var badRequest = new CustomBadRequestResult
        {
            StatusCode = StatusCodes.Status500InternalServerError,
            Title = "Internal Server Error",
            Errors = "There was a problem handling your request. Please try again.",
        };

        context.Result = new ObjectResult(badRequest)
        {
            StatusCode = StatusCodes.Status500InternalServerError,
        };

        context.ExceptionHandled = true;
    }
}