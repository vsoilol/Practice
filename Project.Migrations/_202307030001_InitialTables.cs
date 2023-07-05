using FluentMigrator;

namespace Project.Migrations;

[Migration(202106280001)]
public class _202307030001_InitialTables : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("User")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("FirstName").AsString(50).NotNullable()
            .WithColumn("LastName").AsString(50).NotNullable()
            .WithColumn("MiddleName").AsString(50).NotNullable()
            .WithColumn("Age").AsInt32().NotNullable();
    }
}