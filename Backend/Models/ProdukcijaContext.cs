using Microsoft.EntityFrameworkCore;


namespace Models
{
    public class ProdukcijaContext : DbContext
    {
        public DbSet<Kviz> Kvizovi { get; set; }
        public DbSet<Partija> Partije { get; set; }
        public DbSet<Igrica> Igrice { get; set; }

        public DbSet<Takmicar> Takmicari { get; set; }

        public DbSet<Rezultat> Rezultati { get; set; }

       

        public ProdukcijaContext(DbContextOptions options) : base(options)
        {
           
        }

    }
}