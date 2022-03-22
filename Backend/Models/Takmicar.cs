using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Takmicar{

        [Key]
        public int IDTakmicar{get;set;}
        
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
        [MaxLength(50)]
        public string  Prezime { get; set; }
        [Range(0, 1000)]
        public int GodinaRodjenja { get; set; }
        [MaxLength(50)]
        public string Zanimanje { get; set; }
        [Range(0, 1000)]
        public int OdigranePartije { get; set; }
        [Range(0, 1000)]
        public int BrojPoena { get; set; }
        [JsonIgnore]
        public  Kviz kviz { get; set; }

    


    }
}