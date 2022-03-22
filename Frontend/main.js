import { Kviz } from "./kviz.js";

import { Igrice } from "./igrice.js";
import { Produkcija } from "./produkcija.js";
import { Partija } from "./partija.js";
import { Takmicar,createOptionForSelect } from "./takmicar.js";


const prod=new Produkcija("KVIZOTEKA");
    
fetch("https://localhost:7222/Produkcija/PreuzimanjeKvizova")
.then(p=>p.json())
.then(data=>data.forEach(kviz=>{

    
    var kv=new Kviz(kviz.idKviza,kviz.nazivKviza,kviz.brojIgara,kviz.brojPartija,kviz.brojTakmicara);
   
            prod.dodajKviz(kv);
           // console.log(IDKviza);
             var linija=document.querySelector(".mainBar");
            prod.createButtonQuiz(linija, kviz.nazivKviza);
            var polje1=document.querySelector(".poljeKviz1");
            createOptionForSelect(polje1,kviz.nazivKviza);
            var polje2=document.querySelector(".poljeKviz2");
            createOptionForSelect(polje2, kviz.nazivKviza);
            var polje3=document.querySelector(".poljeKviz3");
            createOptionForSelect(polje3, kviz.nazivKviza);
         



            fetch("https://localhost:7222/Takmicar/PreuzmiTakmicare/"+ kv.id)
            .then(p=>p.json())
            .then(data=>data.forEach(takm=>{

                    var tak=new Takmicar(takm.ime,takm.prezime,takm.godinaRodjenja,takm.zanimanje,takm.odigranePartije,takm.brojPoena);
                    kv.dodajTakmicara(takm.ime+takm.prezime);
                     const po1=document.querySelector(".takm_polje1");
                     const po2=document.querySelector(".takm_polje2");
                    
                     createOptionForSelect(po1,takm.ime+" "+takm.prezime);
                     createOptionForSelect(po2,takm.ime+" "+takm.prezime);
    
                 }));
                 
           
        

            fetch("https://localhost:7222/Igrice/PreuzmiIgrice/"+kviz.idKviza)
                           .then(p=>p.json())
                           
                           .then(data=>data.forEach(igr=>{
                               var kv=prod.kvizovi.find(e=>e.nazivKviza===igr.nazivKviza);
                               //console.log(igr);
                              var igrica=new Igrice(igr.nazivIgre,igr.poeni1,igr.poeni2);
                               const pp=document.querySelectorAll(".poljeIgra");
                               pp.forEach(ev=>{
                                   createOptionForSelect(ev,igrica.nazivIgre);
                               });
                               var partijaIg=document.querySelectorAll(".partijaIgrice");
                              // igrica.crtajIgricu(partijaIg[brPar],igrica.Poeni1,igrica.Poeni2);
                              // kv.dodajIgricu(igrica);
                               prod.dodajNazivIgre(igr.nazivIgre);
 
                                      
                           }));

            fetch("https://localhost:7222/Partija/PreuzmiPartije/"+kviz.idKviza)
          
            .then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        
                            data.forEach(par=>
                        {  
                            let datum=par.dan+"/"+par.mesec+"/"+par.godina;

                         //   var pBroj=document.querySelector(".poljeBroj1");
                           // createOptionForSelect(pBroj,par.redniBroj);
   
                         var pBroj2=document.querySelector(".poljeRedBroj2");
                         createOptionForSelect(pBroj2,par.redniBroj);
               
                           

                        })
                    })

                }
            })
          
            
        }));



//console.log(prod.kvizovi);




/*

var k1=new Kviz(0,"Slagalica",5,4,3);
prod.dodajKviz(k1);
var linija=document.querySelector(".mainBar");
//prod.createButtonQuiz(linija,k1.naziv);

var polje1=document.querySelector(".poljeKviz1");
createOptionForSelect(polje1, k1.naziv);
var polje2=document.querySelector(".poljeKviz2");
createOptionForSelect(polje2, k1.naziv);
var polje3=document.querySelector(".poljeKviz3");
createOptionForSelect(polje3, k1.naziv);
var polje4=document.querySelector(".poljeKviz4");
createOptionForSelect(polje4, k1.naziv);*/

    
prod.crtajProdukciju(document.body);




    