import { Partija} from "./partija.js";
import { Igrice } from "./igrice.js";
import{createOptionForSelect,Takmicar} from "./takmicar.js";



export class Kviz{

    constructor(id,naziv,br_igara,br_partija,br_takmicara){
        this.id=id;
        this.naziv=naziv;
         this.br_igara=br_igara;
        this.br_partija=br_partija;
        this.br_takmicara=br_takmicara;
       
        this.partije=[];
        this.igrice=[];
        this.takmicari=[];
        this.pozicije=[];
        this.kontejner=null;
    }
    dodajPartiju(partija){
        this.partije.push(partija);
    }
    dodajIgricu(igrica){
        this.igrice.push(igrica);
        
    }
    dodajTakmicara(takmicar){
            this.takmicari.push(takmicar);
    }
    obrisiTakmicara(takmicar){
        this.takmicari.pop(takmicar);
    }
    vratiIndexIgrice(naziv){
        this.igrice.forEach(function(ev,index){
            if(ev==naziv)
            {
               return index;            
            }
            else{
                return 0;
            }


        })
    }

      
     
   
    
  
    
    
           
    }