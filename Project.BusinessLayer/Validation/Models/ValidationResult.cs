﻿namespace Project.BusinessLayer.Validation.Models;

public class ValidationResult
{
    public bool IsValid { get; set; }

    public List<string>? Errors { get; set; }
}