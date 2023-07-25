namespace Project.API.Models;

public class CustomBadRequestResult
{
    public int StatusCode { get; set; }

    public string Title { get; set; } = default!;

    public object Errors { get; set; } = default!;
}