using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExaminationSystemDB.Migrations
{
    /// <inheritdoc />
    public partial class StudentRoleAccess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Student",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Student",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Student_ApplicationUserId",
                table: "Student",
                column: "ApplicationUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_AspNetUsers_ApplicationUserId",
                table: "Student",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_AspNetUsers_ApplicationUserId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_ApplicationUserId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Student");

            migrationBuilder.InsertData(
                table: "Student",
                columns: new[] { "ID", "Address", "Email", "HashedPassword", "Name" },
                values: new object[,]
                {
                    { 1, "Benha", "abdelrahman@example.com", "hashed123", "AbdelRahman" },
                    { 2, "Cairo", "sara@example.com", "sara123", "Sara Ahmed" },
                    { 3, "Alexandria", "omar@example.com", "omar123", "Omar Tarek" }
                });
        }
    }
}
