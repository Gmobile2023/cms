using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiceStackBaseCms.Migrations
{
    /// <inheritdoc />
    public partial class ColumnNamePermission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "discriminator",
                schema: "public",
                table: "user_claims",
                type: "character varying(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "discriminator",
                schema: "public",
                table: "role_claims",
                type: "character varying(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "name",
                schema: "public",
                table: "permission",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "discriminator",
                schema: "public",
                table: "user_claims");

            migrationBuilder.DropColumn(
                name: "discriminator",
                schema: "public",
                table: "role_claims");

            migrationBuilder.DropColumn(
                name: "name",
                schema: "public",
                table: "permission");
        }
    }
}
