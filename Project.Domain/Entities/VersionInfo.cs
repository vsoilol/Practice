using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Domain.Entities;

[Table("VersionInfo")]
public class VersionInfo
{
    [Key]
    public long Version { get; set; }
    
    public DateTime? AppliedOn { get; set; }
    
    public string? Description { get; set; }
}