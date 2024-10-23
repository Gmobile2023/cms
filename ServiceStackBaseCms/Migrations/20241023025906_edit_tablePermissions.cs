using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiceStackBaseCms.Migrations
{
    /// <inheritdoc />
    public partial class edit_tablePermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_permissions",
                schema: "public",
                table: "permissions");

            migrationBuilder.RenameTable(
                name: "permissions",
                schema: "public",
                newName: "permission",
                newSchema: "public");

            migrationBuilder.AddPrimaryKey(
                name: "pk_permission",
                schema: "public",
                table: "permission",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_permission",
                schema: "public",
                table: "permission");

            migrationBuilder.RenameTable(
                name: "permission",
                schema: "public",
                newName: "permissions",
                newSchema: "public");

            migrationBuilder.AddPrimaryKey(
                name: "pk_permissions",
                schema: "public",
                table: "permissions",
                column: "id");
        }
    }
}
