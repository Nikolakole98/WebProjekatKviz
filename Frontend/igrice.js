
export class Igrice{

    constructor(nazivIgre,poeni1,poeni2){
    
        this.nazivIgre=nazivIgre;
       this.poeni1=poeni1;
       this.poeni2=poeni2;
        
      
      
    }
    vratiNazivIgre()
    {
        return this.nazivIgre;
    }

     crtajIgricu(host){

        var igricaDeo=document.createElement("div");
        igricaDeo.className="igricaDeo";
        host.appendChild(igricaDeo);

        var igrica_tak1=document.createElement("label");
        igrica_tak1.className="poeniTakm1";
        igrica_tak1.innerHTML=this.poeni1;
        igrica_tak1.values=this.poeni1;
        igricaDeo.appendChild(igrica_tak1);

        var igraPolje=document.createElement("label");
        igraPolje.className="igricaNaziv";
        igraPolje.innerHTML=this.nazivIgre;
        igraPolje.values=this.nazivIgre;
        igricaDeo.appendChild(igraPolje);

        var igrica_tak2=document.createElement("label");
        igrica_tak2.className="poeniTakm2";
        igrica_tak2.innerHTML=this.poeni2;
        igrica_tak2.values=this.poeni2;
        igricaDeo.appendChild(igrica_tak2);


    }
   
UpisiRezultat(p1,p2)
{ 
    //var d1=document.querySelectorAll(".poeniTakm1");
   // d1.value=p1;
   // var d2= document.querySelectorAll(".poeniTakm2");
   // d2.value=p2;
   this.poeni1=p1;
   this.poeni2=p2;
    
}

   
    
}
