using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Rezultat
    {
        [Key]
        public int idRez { get; set; }

        public Kviz kviz { get; set; }
        public Partija partija { get; set; }

        public Igrica igrica { get; set; }
        [Range(0,1000)]
        public int takm1Poeni { get; set; }
        [Range(0,1000)]
        public int takm2Poeni { get; set; }
    }
}