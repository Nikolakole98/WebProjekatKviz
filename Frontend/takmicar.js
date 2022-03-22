export class Takmicar{

    constructor(ime,prezime,godina_rodj,zanimanje,brPartija,brPoena){
       
        
        this.ime=ime;
        this.prezime=prezime;
        this.godina_rodj=godina_rodj;
        this.zanimanje=zanimanje;
        this.brPartija=brPartija;
        this.brPoena=brPoena;
       // this.kviz=kviz;
        
        //this.nizIgrica=[];
        //this.nizPoena=[];

    }
    /*dodajTakmIgricu(igrica){
        this.nizIgrica.push(igrica);
    }
    dodajTakmPoeni(poeni){
        this.nizPoena.push(poeni);
    }*/
    dodajPartiju()
    {
        this.brPartija++;
    }
    dodajPoene(br){
        this.brPoena=this.brPoena+br;
    }
    
   

}
export function createOptionForSelect(parent, i)
{
    var opcija=document.createElement("option");
    opcija.innerText=i;
    opcija.value=i;
    parent.appendChild(opcija);
    
    
}

