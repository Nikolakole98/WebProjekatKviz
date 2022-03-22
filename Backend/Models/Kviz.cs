using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Kviz
    {
        [Key]
        [Range(0, 1000)]

        public int IDKviza { get; set; }
        
        [MaxLength(50)]
        public string NazivKviza { get; set; }
        [Range(0, 1000)]
        public int BrojIgara { get; set; }
        [Range(0, 1000)]
        public int BrojPartija { get; set; }

        [Range(0, 1000)]
        public int BrojTakmicara { get; set; }

         public List<Takmicar> TakmicariKviz{get;set;}
       
        
     
    }
}