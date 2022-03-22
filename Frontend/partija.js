
import { Igrice } from "./igrice.js";
import { Kviz } from "./kviz.js";
import { Rezultat } from "./rezultat.js";
import { createOptionForSelect } from "./takmicar.js";


export class Partija{

    constructor(redni_broj,datum)
    {   
       
        this.redni_broj=redni_broj;
        this.datum=datum;
      //  this.takmicar1=takmicar1;
        //this.takmicar2=takmicar2;
        this.igricePartija=[];
        this.takmicariPartija=[1];
        this.rezultati=[];
       
    }
    dodajRezultat(rez){
        this.rezultati.push(rez);
    }
    
    dodajIgr(igrica){
        this.igricePartija.push(igrica);
    }
    dodajTakm(takmicar){
        this.takmicariPartija.push(takmicar);
    }
    oslobodiPolje2(host){
        host.value=null;
    }
    pronadjiRezultat(nazivIg)
    {
        const par=this.rezultati.find(({nazivIgre})=>nazivIgre===nazivIg);
        return par;
    }

    
   crtajPartiju(host,kv,t1,t2){

        
        var prozorPartija=document.createElement("div");
        prozorPartija.className="kocka";
        host.appendChild(prozorPartija);
       
        
    //RED BROJ+DATUM
        var glavnaLinija= document.createElement("div");
        glavnaLinija.className="glavnaLinija";
        prozorPartija.appendChild(glavnaLinija);
    
        
        var par_broj= document.createElement("label");
        par_broj.className="par_broj";
        par_broj.innerHTML=this.redni_broj;
        par_broj.value=this.redni_broj;
        glavnaLinija.appendChild(par_broj);

        var par_dat= document.createElement("label");
        par_dat.className="par_dat";
        par_dat.innerHTML=this.datum;
        glavnaLinija.appendChild(par_dat);
    
    
       var partija_takm=document.createElement("div");
        partija_takm.className="partijaTakm";
       prozorPartija.appendChild(partija_takm);
    
        var partija_tak1=document.createElement("label");
        partija_tak1.className="par_tak1";
        partija_tak1.innerHTML=t1;
        partija_takm.appendChild(partija_tak1);
      
       
        var ukupno_tak1=document.createElement("div");
        ukupno_tak1.className="ukupnoTakm1";
        ukupno_tak1.innerHTML=0;
        ukupno_tak1.value=0;
        partija_takm.appendChild(ukupno_tak1);

        

        var ukupno_tak2=document.createElement("div");
        ukupno_tak2.className="ukupnoTakm2";
        ukupno_tak2.innerText=0;
        ukupno_tak2.value=0;
        partija_takm.appendChild(ukupno_tak2);
    
        var partija_tak2=document.createElement("label");
        partija_tak2.className="par_tak1";
        partija_tak2.innerHTML=t2;
        partija_takm.appendChild(partija_tak2);
    //IGRICE DEO 
        var partija_igrice=document.createElement("div");
        partija_igrice.className="partijaIgrice";
        prozorPartija.appendChild(partija_igrice);


       fetch("https://localhost:7222/Igrice/PreuzmiIgrice/"+kv.id)
        .then(p=>p.json())
        .then(data=>data.forEach(igr=>{ 
           
           // var rez=new Rezultat(kv.id,this.redni_broj,igr.nazivIgre,igr.poeni1,igr.poeni2);
                 var min=new Igrice(igr.nazivIgre,igr.poeni1,igr.poeni2); 
                min.crtajIgricu(partija_igrice);
               /* const pp=document.querySelector(".poljeIgra");
                createOptionForSelect(pp,igr.nazivIgre);*/
             //   this.dodajIgr(min);
               // this.dodajRezultat(rez);
          
            }));
    

        var ukupno_linija=document.createElement("div");
        ukupno_linija.className="ukupnoLinija";
        prozorPartija.appendChild(ukupno_linija);

    

        var poeni1_red=document.createElement("div");
        ukupno_linija.appendChild(poeni1_red);

        var poeni1_polje=document.createElement("input");
        poeni1_polje.className="poeniTakm1";
        ukupno_linija.appendChild(poeni1_polje);

         var upisPoena=document.createElement("button");
        upisPoena.innerHTML="Upisi poene";
        upisPoena.className="dugme2";
        ukupno_linija.appendChild(upisPoena);


       
        var poeni2_polje=document.createElement("input");
        poeni2_polje.className="poeniTakm1";
        ukupno_linija.appendChild(poeni2_polje);


      var i=0;
        upisPoena.onclick=(ev)=>{
           alert(5);
            
            var p1=parseInt(poeni1_polje.value);
            var p2=parseInt(poeni2_polje.value);
        
            var nizIgr=partija_igrice.querySelectorAll(".igricaNaziv");

             fetch("https://localhost:7222/Rezultat/DodajRezultat/" + kv.id + "/" + this.redni_broj + "/" + nizIgr[i].innerHTML + "/"  + p1 + "/" + p2,
            {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
          
              }).then(p => {
                 
                  
             
                console.log(nizIgr[0].innerHTML);
                 var poljeIgrica=prozorPartija.querySelectorAll(".partijaIgrice");
           var d1=poljeIgrica[0].querySelectorAll(".poeniTakm1");
            ukupno_tak1.value=ukupno_tak1.value+p1;
           var ukP1=parseInt(ukupno_tak1.value); 
           var uk1Polje=prozorPartija.querySelector(".ukupnoTakm1");  
           uk1Polje.innerText= ukP1;
           ukupno_tak2.value=ukupno_tak2.value+p2;
           var ukP2=parseInt(ukupno_tak2.value);           
           var uk2Polje=prozorPartija.querySelector(".ukupnoTakm2");  
           uk2Polje.innerText= ukP2;
           d1[0].innerText=p1;
           d1[0].className="poeniTakm12";
           var d2= poljeIgrica[i].querySelectorAll(".poeniTakm2");
           d2[0].innerText=p2;
           d2[0].className="poeniTakm22";



       //    var div1=prozorPartija.querySelector(".poeniTakm1");
         //  this.oslobodiPolje2(div1);
           

        })
        }

       

      
        var formaPoeni=document.createElement("div");
        prozorPartija.appendChild(formaPoeni);
         

    
    
    }

  /*  preuzmiRezultate(kv1,redBr){
        var i=0;
        fetch(" https://localhost:7222/Rezultat/PreuzmiRezultat/"+ kv1.id+"/"+redBr)
        .then(p=>p.json())
        .then(data=>data.forEach(rez=>{

                          //  console.log(nizIgr[0].innerHTML);
                          var poljePartija=document.querySelector(".kocka");
                            var poljeIgrica=poljePartija.querySelectorAll(".partijaIgrice");
                            var d1=poljeIgrica.querySelectorAll(".poeniTakm1");
                            // var ukP1=parseInt(ukupno_tak1.value); 
                             //var uk1Polje=document.querySelector(".ukupnoTakm1");  
                           //  uk1Polje.value=uk1Polje.value+rez.takm1Poeni;
                           
                           // uk1Polje.innerText= uk1Polje.value;
                          //  ukupno_tak2.value=ukupno_tak2.value+rez.takm1Poeni;
                           // var ukP2=parseInt(ukupno_tak2.value);           
                           // var uk2Polje=prozorPartija.querySelector(".ukupnoTakm2");  
                           // uk2Polje.innerText= ukP2;
                            d1[i].innerText=rez.takm1Poeni;
                            d1[i].className="poeniTakm12";
                            var d2= poljeIgrica[i].querySelectorAll(".poeniTakm2");
                            d2[i].innerText=rez.takm2Poeni;
                            d2[i].className="poeniTakm22";
                            i++;






        }));

    }*/
   


}
export function kreirajDatum(dan,mesec,godina){
    return dan+"."+mesec+"."+godina;
}