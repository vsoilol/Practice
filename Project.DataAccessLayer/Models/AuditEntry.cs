using System.Text.Json;
using Project.Domain.Entities;
using Project.Domain.Enums;

namespace Project.DataAccessLayer.Models;

public class AuditEntry
{
    public Guid? UserId { get; set; }

    public string TableName { get; set; } = null!;

    public Dictionary<string, object> KeyValues { get; } = new();

    public Dictionary<string, object> OldValues { get; } = new();

    public Dictionary<string, object> NewValues { get; } = new();

    public AuditType AuditType { get; set; }

    public List<string> ChangedColumns { get; } = new();

    public AuditLog ToAudit()
    {
        var audit = new AuditLog
        {
            UserId = UserId,
            AuditType = AuditType.ToString(),
            TableName = TableName,
            DateTime = DateTime.UtcNow,
            PrimaryKey = JsonSerializer.Serialize(KeyValues),
            OldValues = OldValues.Count == 0 ? string.Empty : JsonSerializer.Serialize(OldValues),
            NewValues = NewValues.Count == 0 ? string.Empty : JsonSerializer.Serialize(NewValues),
            AffectedColumns = ChangedColumns.Count == 0 ? string.Empty : JsonSerializer.Serialize(ChangedColumns)
        };
        return audit;
    }
}