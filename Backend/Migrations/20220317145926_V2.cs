using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kvizovi",
                columns: table => new
                {
                    IDKviza = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivKviza = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BrojIgara = table.Column<int>(type: "int", nullable: false),
                    BrojPartija = table.Column<int>(type: "int", nullable: false),
                    BrojTakmicara = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kvizovi", x => x.IDKviza);
                });

            migrationBuilder.CreateTable(
                name: "Igrice",
                columns: table => new
                {
                    IDIgrice = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivIgre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Poeni1 = table.Column<int>(type: "int", nullable: false),
                    Poeni2 = table.Column<int>(type: "int", nullable: false),
                    kvizIDKviza = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igrice", x => x.IDIgrice);
                    table.ForeignKey(
                        name: "FK_Igrice_Kvizovi_kvizIDKviza",
                        column: x => x.kvizIDKviza,
                        principalTable: "Kvizovi",
                        principalColumn: "IDKviza",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Takmicari",
                columns: table => new
                {
                    IDTakmicar = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    GodinaRodjenja = table.Column<int>(type: "int", nullable: false),
                    Zanimanje = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    OdigranePartije = table.Column<int>(type: "int", nullable: false),
                    BrojPoena = table.Column<int>(type: "int", nullable: false),
                    kvizIDKviza = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Takmicari", x => x.IDTakmicar);
                    table.ForeignKey(
                        name: "FK_Takmicari_Kvizovi_kvizIDKviza",
                        column: x => x.kvizIDKviza,
                        principalTable: "Kvizovi",
                        principalColumn: "IDKviza",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Partije",
                columns: table => new
                {
                    IDPartija = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RedniBroj = table.Column<int>(type: "int", nullable: false),
                    Dan = table.Column<int>(type: "int", nullable: false),
                    Mesec = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Godina = table.Column<int>(type: "int", nullable: false),
                    IDTakm1 = table.Column<int>(type: "int", nullable: false),
                    Takmicar1IDTakmicar = table.Column<int>(type: "int", nullable: true),
                    IDTakm2 = table.Column<int>(type: "int", nullable: false),
                    Takmicar2IDTakmicar = table.Column<int>(type: "int", nullable: true),
                    kvizIDKviza = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partije", x => x.IDPartija);
                    table.ForeignKey(
                        name: "FK_Partije_Kvizovi_kvizIDKviza",
                        column: x => x.kvizIDKviza,
                        principalTable: "Kvizovi",
                        principalColumn: "IDKviza",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Partije_Takmicari_Takmicar1IDTakmicar",
                        column: x => x.Takmicar1IDTakmicar,
                        principalTable: "Takmicari",
                        principalColumn: "IDTakmicar",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Partije_Takmicari_Takmicar2IDTakmicar",
                        column: x => x.Takmicar2IDTakmicar,
                        principalTable: "Takmicari",
                        principalColumn: "IDTakmicar",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rezultati",
                columns: table => new
                {
                    idRez = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    kvizIDKviza = table.Column<int>(type: "int", nullable: true),
                    partijaIDPartija = table.Column<int>(type: "int", nullable: true),
                    igricaIDIgrice = table.Column<int>(type: "int", nullable: true),
                    takm1Poeni = table.Column<int>(type: "int", nullable: false),
                    takm2Poeni = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezultati", x => x.idRez);
                    table.ForeignKey(
                        name: "FK_Rezultati_Igrice_igricaIDIgrice",
                        column: x => x.igricaIDIgrice,
                        principalTable: "Igrice",
                        principalColumn: "IDIgrice",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rezultati_Kvizovi_kvizIDKviza",
                        column: x => x.kvizIDKviza,
                        principalTable: "Kvizovi",
                        principalColumn: "IDKviza",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rezultati_Partije_partijaIDPartija",
                        column: x => x.partijaIDPartija,
                        principalTable: "Partije",
                        principalColumn: "IDPartija",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Igrice_kvizIDKviza",
                table: "Igrice",
                column: "kvizIDKviza");

            migrationBuilder.CreateIndex(
                name: "IX_Partije_kvizIDKviza",
                table: "Partije",
                column: "kvizIDKviza");

            migrationBuilder.CreateIndex(
                name: "IX_Partije_Takmicar1IDTakmicar",
                table: "Partije",
                column: "Takmicar1IDTakmicar");

            migrationBuilder.CreateIndex(
                name: "IX_Partije_Takmicar2IDTakmicar",
                table: "Partije",
                column: "Takmicar2IDTakmicar");

            migrationBuilder.CreateIndex(
                name: "IX_Rezultati_igricaIDIgrice",
                table: "Rezultati",
                column: "igricaIDIgrice");

            migrationBuilder.CreateIndex(
                name: "IX_Rezultati_kvizIDKviza",
                table: "Rezultati",
                column: "kvizIDKviza");

            migrationBuilder.CreateIndex(
                name: "IX_Rezultati_partijaIDPartija",
                table: "Rezultati",
                column: "partijaIDPartija");

            migrationBuilder.CreateIndex(
                name: "IX_Takmicari_kvizIDKviza",
                table: "Takmicari",
                column: "kvizIDKviza");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rezultati");

            migrationBuilder.DropTable(
                name: "Igrice");

            migrationBuilder.DropTable(
                name: "Partije");

            migrationBuilder.DropTable(
                name: "Takmicari");

            migrationBuilder.DropTable(
                name: "Kvizovi");
        }
    }
}
