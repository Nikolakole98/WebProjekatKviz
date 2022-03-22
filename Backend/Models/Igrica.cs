using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Igrica
    {
        [Key]
        public int IDIgrice { get; set; }
        
        [MaxLength(50)]
       
        public string NazivIgre { get; set; }= default!;
        
        [Range(0, 1000)]
        public int Poeni1 { get; set; }

        [Range(0, 1000)]
        public int Poeni2 { get; set; }


        public Kviz kviz { get; set; }

      
    }
}