using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Partija{

        
        [Key]
        public int IDPartija { get; set; }
        [Range(0,1000)]
        public int RedniBroj { get; set; }
        [Range(0,1000)]
        public int  Dan { get; set; }

        public string Mesec { get; set; }
        [Range(0,1000)] 
        public int Godina { get; set; }
      
        public Takmicar Takmicar1 { get; set; }

       
        public Takmicar Takmicar2 { get; set; }

        public Kviz kviz { get; set; }

        public List<Rezultat> RezultatPartija { get; set; }

       
    
    }
}