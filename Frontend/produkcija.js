import { Kviz } from "./kviz.js";
import { Partija} from "./partija.js";
import { Igrice } from "./igrice.js";
import{createOptionForSelect,Takmicar} from "./takmicar.js";
import { Rezultat } from "./rezultat.js";


export class Produkcija
{
    constructor(nazivProdukcije)
    {
       
        this.nazivProdukcije=nazivProdukcije;
        this.kvizovi=[];
        this.partije_niz=[];
        this.nazivIgre=[];
    }
    dodajKviz(kviz){
        this.kvizovi.push(kviz);
    }

    dodajNazivIgre(igreNaz){
        this.nazivIgre.push(igreNaz);
    }
    indeksIgre(nazivIgrice)
    {
        for(var i=0;i<this.brojIgara-1;i++)
        {
            if(this.nazivIgre[i]===nazivIgrice)
            {
                return i;
            }
            
        }
    }
    
    oslobodiPolje(host){
        host.value=null;
    }
    createButtonQuiz(parent, i)
    {
        var but=document.createElement("button");
        but.className="dugmeKviz1";
        but.innerText=i;
        parent.appendChild(but);
       var prost=document.querySelector(".prozor4");
       var prost1=document.querySelector(".prozor5");  
       var p1=0;
       var p2=0;
        var kvizic=this.kvizovi.find(el=>el.naziv==i);
       
        but.onclick=(ev)=>{

        console.log(kvizic);
        
        

            if( prost.style.display==='none' && prost1.style.display==='none')
             { 
                 if(p1==0)
                 {
                    p1=1;
                 this.crtajKviz(prost,kvizic.naziv);
                 prost.style.display='block';
                 prost1.style.display='none';
                 }
                 else
                 {
                    prost.style.display='block';
                    prost1.style.display='none';
                 }
             }
             else if(prost.style.display==='block' && prost1.style.display==='none')
             {
                 if(p2==0)
                 {
                     p2=1;
                 prost.style.display='none';
                 prost1.style.display='block'; 
                 this.crtajKviz(prost1,kvizic.naziv);
                /* var pBroj=document.querySelector(".poljeBroj1");
                 this.oslobodiPolje(pBroj);
                var pBroj2=document.querySelector(".poljeRedBroj2");*/
                 }
                 else
                 {
                    prost.style.display='none';
                    prost1.style.display='block'; 
                 }
                
                 
             }
             else if(prost.style.display==='none' && prost1.style.display==='block')
             {
                if(p1==0)
                {
                   p1=1;
                this.crtajKviz(prost,kvizic.naziv);
                prost.style.display='block';
                prost1.style.display='none';
                }
                else
                {
                   prost.style.display='block';
                   prost1.style.display='none';
                }
               
               /* var pBroj=document.querySelector(".poljeBroj1");
                 pBroj==0;
                var pBroj2=document.querySelector(".poljeRedBroj2");
                pBroj2==null;*/
               
             }
             else
             {
                prost1.style.display='none';
                prost.style.display='none';
             }
        
        }
    }
    crtajProdukciju(host){
        if(!host)
        {
            throw new Error("Host ne postoji!");
        }

        const prozor=document.createElement("div");
        prozor.className="prozor1";
        host.appendChild(prozor);
    //NASLOV     
        const h1=document.createElement("div");
        h1.className="h1";
        prozor.appendChild(h1);

        const naziv_kviza=document.createElement("label");
        naziv_kviza.innerHTML=this.nazivProdukcije.toUpperCase();
        naziv_kviza.className="naslov";
        h1.appendChild(naziv_kviza);
 
    //GLAVNA LINIJA

        const main_bar=document.createElement("div");
        main_bar.className="mainBar";
        prozor.appendChild(main_bar);

    //FORME    

         var prozor2=document.createElement("div");
         prozor2.className="prozor2";
         prozor.appendChild(prozor2);
         
         var prozor3=document.createElement("div");
         prozor3.className="prozor3";
         prozor2.appendChild(prozor3);
         this.crtajForme(prozor3);

        
         var prozor4=document.createElement("div");
         prozor4.className="prozor4";
         prozor2.appendChild(prozor4);
         prozor4.style.display='none';

        /////


       /*  var kontejner1=document.createElement("div");
         kontejner1.className="kont1";
         prozor4.appendChild(kontejner1);
        kontejner1.style.display='none';*/
 
        

         var prozor5=document.createElement("div");
         prozor5.className="prozor5";
         prozor2.appendChild(prozor5);
         prozor5.style.display='none';

        /* var kontejner2=document.createElement("div");
         kontejner2.className="kont2";
         prozor5.appendChild(kontejner2);
         kontejner2.style.display='none';*/
        
      

    }
    crtajKviz(host,imeKv){
        if(!host)
        {
            throw new Error("Host ne postoji!");
        }
        else
        {
        const kvizProstor=document.createElement("div");
        kvizProstor.className="kvizProstor";
        host.appendChild(kvizProstor);
        

        var glavniProstor=document.createElement("div");
         glavniProstor.className="glavniProzor";
         kvizProstor.appendChild(glavniProstor);
        

        const mainList=document.createElement("div");
         mainList.className="mainList";
         glavniProstor.appendChild(mainList);
         
         var imeKviza=document.createElement("label");
        imeKviza.className="kvizNaslov";
         imeKviza.innerText=imeKv.toUpperCase();
        mainList.appendChild(imeKviza);
        
        var kont1=document.createElement("div");
        kont1.className="kont1";
        glavniProstor.appendChild(kont1);
      

        var kont2=document.createElement("div");
        kont2.className="kont2";
        glavniProstor.appendChild(kont2);
       
       

        var kvizic=this.kvizovi.find(el=>el.naziv==imeKv);
        var kv1=new Kviz(kvizic.id,kvizic.nazivKviza,kvizic.brojIgara,kvizic.brojPartija,kvizic.brojTakmicara);
        

        fetch("https://localhost:7222/Partija/PreuzmiPartije/"+kv1.id)
        .then(p=>p.json())
        .then(data1=>data1.forEach(par=>{ 
            
            console.log(par);
            var t1=null;
            var t2=null;
            var q=0;
            fetch("https://localhost:7222/Takmicar/PreuzmiTakmicare/"+ kv1.id)
            .then(p=>p.json())
            .then(data=>data.forEach(takm=>{

               
                 console.log(takm);

                    if(par.takmicar1==takm.IDTakmicar)
                   {
                    var tak=new Takmicar(takm.ime,takm.prezime,takm.godinaRodjenja,takm.zanimanje,takm.odigranePartije,takm.brojPoena);
                      t1=tak.ime+" "+tak.prezime;
                       console.log(takm.idTakmicar);
                        if(par.takmicar2==takm.IDTakmicar)
                        {  

                            t2=takm.ime+" "+takm.prezime;
                            
                            const me= par.mesec;
                            let datum=par.dan+"/"+me+"/"+par.godina;
                            var partija=new Partija(par.redniBroj,datum);
                            console.log(par);
                             var proz=document.querySelector(".prozor4");  
                             if(proz.style.display=='block')
                            {
                                 kont2.style.display='none';
                                if(q==0)
                                {
                                    partija.crtajPartiju(kont1,kv1,t1,t2);   
                                    q=1;
                                    var i=0;
                                    var part=document.querySelectorAll(".par_broj");
                                    part.forEach(e=>{
                                         if(e.value==partija.redni_broj)
                                        {
                                             console.log(e.value);
                                        }
                                        else
                                        {
                                            i++;
                                        }
                                        })
                                     var up1=0;
                                     var up2=0;
                                    fetch(" https://localhost:7222/Rezultat/PreuzmiRezultat/"+ kv1.id+"/"+partija.redni_broj)
                                    .then(p=>p.json())
                                    .then(data=>data.forEach(rez=>{

                                        console.log(rez.takm1Poeni);
                                         up1=up1+rez.takm1Poeni;
                                        up2=up2+rez.takm2Poeni;
                                        console.log(i);
                                      
                      
                                        var poljeIgrica=document.querySelectorAll(".partijaIgrice");
                                        var d1=poljeIgrica[i].querySelectorAll(".poeniTakm1");
                                        var ukpT1=document.querySelectorAll(".ukupnoTakm1");
                                        ukpT1[i].innerText=up1;
    
                                        var d2=poljeIgrica[i].querySelectorAll(".poeniTakm1");
                                        var ukpT2=document.querySelectorAll(".ukupnoTakm2");
                                        ukpT2[i].innerText=up2;
                                       
                           

                                         d1[0].innerHTML=rez.takm1Poeni;
                                         d1[0].className="poeniTakm12";
                                         var d2= poljeIgrica[i].querySelectorAll(".poeniTakm2");
                                         d2[0].innerHTML=rez.takm2Poeni;
                                         d2[0].className="poeniTakm22";
     

                                    }));


                                }

                             }
                             else 
                             {
                                kont1.style.display='none';
                                if(q==0)
                                {
                                partija.crtajPartiju(kont2,kv1,t1,t2);  
                               
                                q=1;
                                var i=0;
                                var part=document.querySelectorAll(".par_broj");
                                part.forEach(e=>{
                                     if(e.value==partija.redni_broj)
                                    {
                                         console.log(e.value);
                                    }
                                    else
                                    {
                                        i++;
                                    }
                                    })
                                    var up1=0;
                                    var up2=0;
                                fetch(" https://localhost:7222/Rezultat/PreuzmiRezultat/"+ kv1.id+"/"+partija.redni_broj)
                                .then(p=>p.json())
                                .then(data=>data.forEach(rez=>{

                                    console.log(rez.takm1Poeni);
                                    up1=up1+rez.takm1Poeni;
                                    up2=up2+rez.takm2Poeni;
                                    console.log(i);
                                    
                                    var poljeIgrica=document.querySelectorAll(".partijaIgrice");
                                    var d1=poljeIgrica[i].querySelectorAll(".poeniTakm1");
                                    var ukpT1=document.querySelectorAll(".ukupnoTakm1");
                                    ukpT1[i].innerText=up1;

                                    var d2=poljeIgrica[i].querySelectorAll(".poeniTakm1");
                                    var ukpT2=document.querySelectorAll(".ukupnoTakm2");
                                    ukpT2[i].innerText=up2;
                                   
                       
                                     d1[0].innerHTML=rez.takm1Poeni;
                                     d1[0].value=rez.takm1Poeni;
                                     d1[0].className="poeniTakm12";
                                     var d2= poljeIgrica[i].querySelectorAll(".poeniTakm2");
                                     d2[0].innerHTML=rez.takm2Poeni;
                                     d2[0].className="poeniTakm22";
                                     d2[0].value=rez.takm2Poeni;
 





                                }));






                            } 
                             }







                        }
                    
                    
                    
                    
                    
            
                       
                      
                   }
    
                 }));
            ///
              
            /*    const me= par.mesec;
                let datum=par.dan+"/"+me+"/"+par.godina;
                var partija=new Partija(par.redniBroj,datum);
                console.log(par);
                 var proz=document.querySelector(".prozor4");  
                 if(proz.style.display=='block')
                 {
                     kont2.style.display='none';
                    partija.crtajPartiju(kont1,kv1,t1,par.takmicar2);     
                 }
                 else 
                 {
                     kont1.style.display='none';
                     partija.crtajPartiju(kont2,kv1,t1,par.takmicar2);   
                 }
    
         */
            
                     
                
                    }));
        }
    }
                

    crtajForme(host)
    {
        const forme=document.createElement("div");
        forme.className="forme";

        const dugme0=document.createElement("button");
        dugme0.className="button";
        dugme0.innerHTML="Dodaj takmicara";
        forme.appendChild(dugme0);
        
        const for0=document.createElement("div");
        for0.className="Element";
         this.crtajFormaTakmicara(for0);
        forme.appendChild(for0);
        for0.style.display='none';
        
    
        dugme0.onclick=(ev)=>{
            
            if( for0.style.display==='none')
            {
              
                for0.style.display='block';
            }
            else
            {
                for0.style.display='none';
             
            }
        };
        

        const dugme1=document.createElement("button");
        dugme1.className="button";
        dugme1.innerHTML="Dodaj partiju";
        forme.appendChild(dugme1);
        
        const for1=document.createElement("div");
        for1.className="Element";
         this.crtajFormaPartija(for1);
        forme.appendChild(for1);
        for1.style.display='none';
        
    
        dugme1.onclick=(ev)=>{
            
            if( for1.style.display==='none')
            {
              
                for1.style.display='block';
            }
            else
            {
                for1.style.display='none';
             
            }
        };
        const dugme2=document.createElement("button");
        dugme2.className="button";
        dugme2.innerHTML="Obrisi partiju";
        forme.appendChild(dugme2);
        
        const for2=document.createElement("div");
        forme.appendChild(for2);
        this.crtajFormaObrisi(for2);
        for2.style.display='none';
        dugme2.onclick=(ev)=>{
            
            
            if( for2.style.display==='none')
            {
               
                for2.style.display='block';
            }
            else
            {
                for2.style.display='none';
             
            }
        };
        
       
       
      /* const dugme3=document.createElement("button");
       dugme3.className="button";
       dugme3.innerHTML="Upisi poene";
       forme.appendChild(dugme3);
       
       const for3=document.createElement("div");
       forme.appendChild(for3);
        this.crtajFormaPoeni(for3);
        for3.style.display='none';
       dugme3.onclick=(ev)=>{
           
           
           if( for3.style.display==='none')
           {
              
               for3.style.display='block';
           }
           else
           {
               for3.style.display='none';
            
           }
       };*/

        host.appendChild(forme);
    }

    crtajFormaPartija(host){
        if(!host)
        {
            throw new Error("Host ne postoji!");
        }
        const formPartija=document.createElement("div");
        formPartija.className="formPartija";
        host.appendChild(formPartija);

       /* const naslovPartija=document.createElement("label");
        naslovPartija.innerText='DODAJ PARTIJU';
        naslovPartija.className="naslovPartija";
        formPartija.appendChild(naslovPartija);*/

        var kviz_red=document.createElement("div");
        kviz_red.className="red";
        formPartija.appendChild(kviz_red);

        const kviz_lab=document.createElement("label");
        kviz_lab.className="lab";
        kviz_lab.innerText="Kviz:";
        kviz_red.appendChild(kviz_lab);

        var kviz_polje=document.createElement("select");
        kviz_polje.className="poljeKviz2";
        kviz_red.appendChild(kviz_polje);


        var broj_red=document.createElement("div");
        broj_red.className="red";
        formPartija.appendChild(broj_red);

        var broj_lab=document.createElement("label");
        broj_lab.innerText="Redni broj:";
        broj_lab.className="lab";
        broj_red.appendChild(broj_lab);

        let broj_polje=document.createElement("input");
        broj_polje.className="poljeRedBroj";
        broj_red.appendChild(broj_polje);


        var datum_red=document.createElement("div");
        datum_red.className="red";
        formPartija.appendChild(datum_red);

        var datum_lab=document.createElement("label");
        datum_lab.innerText="Datum:";
        datum_lab.className="lab";
        datum_red.appendChild(datum_lab);

        var datum_format=document.createElement("div");
        formPartija.appendChild(datum_format);
        
        var dan_polje=document.createElement("select");
        dan_polje.className="danBroj";
        datum_format.appendChild(dan_polje);

        for(let i=1;i<=31;i++){
            let opcija=document.createElement("option");
            opcija.innerText=i;
            dan_polje.appendChild(opcija);
        }

        var mesec_polje=document.createElement("select");
        mesec_polje.className="mesecPolje";
        datum_format.appendChild(mesec_polje);

        var meseci=["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"];
        meseci.forEach(ev=>{
            var opcija=document.createElement("option");
            opcija.innerText=ev;
            mesec_polje.appendChild(opcija);

        })
        
        var godinaPolje=document.createElement("select");
        godinaPolje.className="poljeBroj";
        datum_format.appendChild(godinaPolje);

        for(let i=2018;i<=2026;i++)
        {
            var opcija=document.createElement("option");
            opcija.innerText=i;
            godinaPolje.appendChild(opcija);
        }
        
        var takm1_lab=document.createElement("label");
        takm1_lab.innerText="TAKMICAR 1:";
        takm1_lab.className="lab";
        formPartija.appendChild(takm1_lab);

        
        
        var takm1_polje=document.createElement("select");
        takm1_polje.className="takm_polje1";
        formPartija.appendChild(takm1_polje);

        var takm2_lab=document.createElement("label");
        takm2_lab.innerText="TAKMICAR 2:";
        takm2_lab.className="lab";
        formPartija.appendChild(takm2_lab);
        
        var takm2_polje=document.createElement("select");
        takm2_polje.className="takm_polje2";
        formPartija.appendChild(takm2_polje);


        const partija_dugme=document.createElement("button");
        partija_dugme.innerText="DODAJ PARTIJU";
        partija_dugme.className="dugme";
        formPartija.appendChild(partija_dugme);


        partija_dugme.onclick=(ev)=>{


            var kviz1=document.querySelector(".poljeKviz2").value;
            var red_br=parseInt(broj_polje.value);
            var d1=parseInt(dan_polje.value);
           
            var m1=document.querySelector(".mesecPolje").value;
            var god1=parseInt(godinaPolje.value);

            var tak_1=document.querySelector(".takm_polje1").value;
            let takmicar1 = tak_1.split(" ");
            
            var tak_2=document.querySelector(".takm_polje2").value;
            let takmicar2 = tak_2.split(" ");
            console.log(takmicar2[0]);
            console.log(takmicar2[1]);
            let dat=d1+"/"+m1.value+"/"+god1;
            var kviz2=this.kvizovi.find(p=>p.naziv==kviz1);
           // console.log(kviz.takmicari);
          

            var kv1=new Kviz(kviz2.id,kviz2.nazivKviza,kviz2.brojIgara,kviz2.brojPartija,kviz2.brojTakmicara);
            let pa=new Partija(red_br,dat,tak_1,tak_2);
            console.log(pa);
            // console.log(kv.takmicari);
            if(tak_2==tak_1)
            {
                alert("Uneli ste istog takmicara na obe pozicije!!");
            }
             else
            {
          
           
               fetch("https://localhost:7222/Partija/DodajPartiju/"+ kv1.id+"/"+red_br+"/"+d1+"/"+m1+"/"+god1+"/"+takmicar1[0]+"/"+takmicar1[1]+"/"+takmicar2[0]+"/"+takmicar2[1],
                {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json"
                 },
                body: JSON.stringify(pa)
                  }).then(p => {
                     if(p.ok)
                     {
                         alert("Dodali ste novu partiju");
                       // var prost=document.querySelector(".prozor4");
                         // prost.style.display='block';
                         var poz=document.querySelector(".kont1");
                         var poz1=document.querySelector(".kont2");
                         
                        if(poz.style.display=='block')
                        {
                            console.log(tak_1);
                            pa.crtajPartiju(poz,kv1,tak_1.innerHTML,tak_2.innerHTML);
                        }
                        else
                        {
                            console.log(tak_1);
                            pa.crtajPartiju(poz1,kv1,tak_1.innerHTML,tak_2.innerHTML);
                        }
                        
    
                        var pBroj2=document.querySelector(".poljeRedBroj2");
                        createOptionForSelect(pBroj2,red_br);
                        location.reload();
                     
                        }
                        else
                        {
                            alert("Greska prilikom dodavanja nove partije, redni broj partije vec postoji, takmicari ne postoje u izabranom kvizu");
                        }
                       
                  
                 });
            
            
               }

        }


    }

    crtajFormaObrisi(host){
        if(!host)
        {
            throw new Error("Host ne postoji!");
        }
        const formPartija1=document.createElement("div");
        formPartija1.className="formPartija";
        host.appendChild(formPartija1);

       /* const naslovPartija1=document.createElement("label");
        naslovPartija1.innerText='OBRISI PARTIJU';
        naslovPartija1.className="naslovPartija";
        formPartija1.appendChild(naslovPartija1);*/

        var kviz_red=document.createElement("div");
        kviz_red.className="red";
        formPartija1.appendChild(kviz_red);

        const kviz_lab=document.createElement("label");
        kviz_lab.className="lab";
        kviz_lab.innerText="Kviz:";
        kviz_red.appendChild(kviz_lab);

        var kviz_polje=document.createElement("select");
        kviz_polje.className="poljeKviz3";
        kviz_red.appendChild(kviz_polje);

        var broj_red1=document.createElement("div");
        broj_red1.className="red";
        formPartija1.appendChild(broj_red1);

        var broj_lab1=document.createElement("label");
        broj_lab1.innerText="Redni broj:";
        broj_lab1.className="lab";
        broj_red1.appendChild(broj_lab1);

        let broj_polje2=document.createElement("select");
        broj_polje2.className="poljeRedBroj2";
        broj_red1.appendChild(broj_polje2);

        const obrisi_dugme=document.createElement("button");
        obrisi_dugme.innerText="OBRISI PARTIJU";
        obrisi_dugme.className="dugme";
        formPartija1.appendChild(obrisi_dugme);


        obrisi_dugme.onclick=(ev)=>{

            var kviz2=document.querySelector(".poljeKviz3").value;
            var redPartija=parseInt(broj_polje2.value);
            var kviz=this.kvizovi.find(p=>p.naziv==kviz2);
           

            fetch("https://localhost:7222/Partija/BrisanjePartije/"+ kviz.id+"/"+redPartija,
            {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json"
             },
           // body: JSON.stringify(tak)
              }).then(p => {
                 if(p.ok)
                 {
                     alert("Obrisali ste partiju");
                     location.reload();
                   
                 }
                 else 
                 {
                    alert("Partija ne postoji u izabranom kvizu");
              }});      
                         
      
            

        }



    }
    crtajFormaTakmicara(host){
        if(!host)
        {
            throw new Error("Host ne postoji!");
        }

        const formTakm=document.createElement("div");
        formTakm.className="formPartija";
        host.appendChild(formTakm); 

        var kviz_red=document.createElement("div");
        kviz_red.className="red";
        formTakm.appendChild(kviz_red);

        const kviz_lab=document.createElement("label");
        kviz_lab.className="lab";
        kviz_lab.innerText="Kviz:";
        kviz_red.appendChild(kviz_lab);

        var kviz_polje=document.createElement("select");
        kviz_polje.className="poljeKviz1";
        kviz_red.appendChild(kviz_polje);

        var ime_red=document.createElement("div");
        ime_red.className="red";
        formTakm.appendChild(ime_red);

        var ime_lab=document.createElement("label");
        ime_lab.innerText='Ime:';
        ime_lab.className="lab";
        ime_red.appendChild(ime_lab);

        let ime_polje=document.createElement("input");
        ime_polje.className="ime_polje";
        ime_red.appendChild(ime_polje);

        var prezime_red=document.createElement("div");
        prezime_red.className="red";
        ime_red.appendChild(prezime_red);

        var prezime_lab=document.createElement("label");
        prezime_lab.innerText='Prezime:';
        prezime_lab.className="lab";
        prezime_red.appendChild(prezime_lab);

        var prezime_polje=document.createElement("input");
        prezime_polje.className="prezime_polje";
        prezime_red.appendChild(prezime_polje);

        var godine_red=document.createElement("div");
        godine_red.className="red";
        ime_red.appendChild(godine_red);

        var godine_lab=document.createElement("label");
        godine_lab.innerText='Godine:';
        godine_lab.className="lab";
        godine_red.appendChild(godine_lab);

        var godine_polje1=document.createElement("select");
        godine_polje1.className="godine_polje";
        godine_red.appendChild(godine_polje1);

        for(let i=10;i<=80;i++){
            let opcija=document.createElement("option");
            opcija.innerText=i;
            godine_polje1.appendChild(opcija);
        }

        var zanimanje_red=document.createElement("div");
        zanimanje_red.className="red";
        ime_red.appendChild(zanimanje_red);

        var zanimanje_lab=document.createElement("label");
        zanimanje_lab.innerText='Zanimanje:';
        zanimanje_lab.className="lab";
        zanimanje_red.appendChild(zanimanje_lab);

        var zanimanje_polje=document.createElement("input");
        zanimanje_polje.className="zanimanje_polje";
        zanimanje_red.appendChild(zanimanje_polje);

        const takm_dugme=document.createElement("button");
        takm_dugme.innerText="DODAJ TAKMICARA";
        takm_dugme.className="dugme";
        ime_red.appendChild(takm_dugme);

        takm_dugme.onclick=(ev)=>
        {

            var kviz1=document.querySelector(".poljeKviz1").value;
           var ime=document.querySelector(".ime_polje").value;
           var prezime=document.querySelector(".prezime_polje").value;
            var godine=parseInt(godine_polje1.value);
            var zanimanje=document.querySelector(".zanimanje_polje").value;
            var kviz=this.kvizovi.find(p=>p.naziv==kviz1);
           
          

            var kv=new Kviz(kviz.id,kviz.nazivKviza,kviz.brojIgara,kviz.brojPartija,kviz.brojTakmicara);
            let tak = new Takmicar(ime,prezime,godine,zanimanje,0,0);
            console.log(tak);

            fetch("https://localhost:7222/Takmicar/DodajTakmicara/"+ kv.id+"/"+ime+"/"+prezime+"/"+godine+"/"+zanimanje,
            {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
            body: JSON.stringify(tak)
              }).then(p => {
                 if(p.ok)
                 {
                     alert("Dodali ste novog Takmicara")
                     //location.reload();
                     const po1=document.querySelector(".takm_polje1");
                     const po2=document.querySelector(".takm_polje2");
                    
                     createOptionForSelect(po1,tak.ime+" "+tak.prezime);
                     createOptionForSelect(po2,tak.ime+" "+tak.prezime);
                 
                
                
                    var ime1=document.querySelector(".ime_polje");
                    var prezime1=document.querySelector(".prezime_polje");
                    var godine1=document.querySelector(".godine_polje");
                    var zanimanje1=document.querySelector(".zanimanje_polje");
                   this.oslobodiPolje(ime1);
                    this.oslobodiPolje(prezime1);
                    this.oslobodiPolje(godine1);
                    this.oslobodiPolje(zanimanje1);
                 }
                 //else 
                 //alert("Greška!")
             });
        
           
           

          
        }}  


    crtajFormaPoeni(host){
            if(!host)
            {
                throw new Error("Host ne postoji!");
            }
    
            const formRez=document.createElement("div");
            formRez.className="formPartija";
            host.appendChild(formRez);
            
            /*const naslovRez=document.createElement("label");
            naslovRez.innerText="UPISI POENE";
            naslovRez.className="naslovPartija";
            formRez.appendChild(naslovRez);*/
    
            var kviz_red=document.createElement("div");
            kviz_red.className="red";
            formRez.appendChild(kviz_red);
    
            const kviz_lab=document.createElement("label");
            kviz_lab.className="lab";
            kviz_lab.innerText="Kviz:";
            kviz_red.appendChild(kviz_lab);
    
            var kviz_polje=document.createElement("select");
            kviz_polje.className="poljeKviz4";
            kviz_red.appendChild(kviz_polje);
    
            var partija_red=document.createElement("div");
            partija_red.className="red";
            formRez.appendChild(partija_red);
    
            const partija_lab=document.createElement("label");
            partija_lab.className="lab";
            partija_lab.innerText="Partija:";
            partija_red.appendChild(partija_lab);
    
            let partija_polje=document.createElement("select");
            partija_polje.className="poljeBroj1";
            partija_red.appendChild(partija_polje);
    
    
            var igra_red=document.createElement("div");
            igra_red.className="red";
            formRez.appendChild(igra_red);
    
            const igra_lab=document.createElement("label");
            igra_lab.className="lab";
            igra_lab.innerText="Igra:";
            igra_red.appendChild(igra_lab);
    
            /*var igra_polje=document.createElement("select");
            igra_polje.className="poljeIgra";
            igra_red.appendChild(igra_polje);*/
    
    
            var poeni1_red=document.createElement("div");
            formRez.appendChild(poeni1_red);
    
            var poeni1_lab=document.createElement("label");
            poeni1_lab.innerText="Takmicar 1:";
            poeni1_lab.className="lab";
            poeni1_red.appendChild(poeni1_lab);
    
            var poeni1_polje=document.createElement("input");
            poeni1_polje.className="poljeBroj";
            poeni1_red.appendChild(poeni1_polje);
    
            var poeni2_red=document.createElement("div");
            formRez.appendChild(poeni2_red);
    
            var poeni2_lab=document.createElement("label");
            poeni2_lab.innerText="Takmicar 2:";
            poeni2_lab.className="lab";
            poeni2_red.appendChild(poeni2_lab);
    
            var poeni2_polje=document.createElement("input");
            poeni2_polje.className="poljeBroj";
            poeni2_red.appendChild(poeni2_polje);
    
    
            var poeni_dugme=document.createElement("button");
            poeni_dugme.innerText="UPISI POENE";
            poeni_dugme.className="dugme";
            formRez.appendChild(poeni_dugme);
    
            poeni_dugme.onclick=(ev)=>{
                
                var kviz2=document.querySelector(".poljeKviz3").value;
                var redPartija=parseInt(partija_polje.value);
                var nazivIgrice=document.querySelector(".poljeIgra").value;
                var takm1Poeni=parseInt(poeni1_polje.value);
                var takm2Poeni=parseInt(poeni2_polje.value);

                var rez=new Rezultat(kviz2,redPartija,nazivIgrice,takm1Poeni,takm2Poeni);
               

                 fetch("https://localhost:7222/Rezultat/AzurirajRezultat/"+kviz2+"/"+redPartija+"/"+nazivIgrice+"/"+takm1Poeni+"/"+takm2Poeni,
                    {
                        method:"PUT",
                        headers:{
                            "Content-Type": "application/json"
                        },
                    })
                    .then(response => {
                        if(response.ok)
                            {
                                var nizPartija=document.querySelectorAll(".par_broj");
                                nizPartija.forEach(function(el1,index1){
                                if(el1.value==redPartija)
                                {
                                    if(index1==0)
                                    {
                                        console.log(index1*5);
                                        rez.ApdejtujRezultat(takm1Poeni,takm2Poeni,index1*5);
                                    }
                                    else{

                                         console.log((index1*5)-1);
                                        rez.ApdejtujRezultat(takm1Poeni,takm2Poeni,(index1*5)-1);
                                    }
                                   
                                   

                                     var nizIgr=document.querySelectorAll(".poljeIgra");
                                     
                                     nizIgr.forEach(function(el,index){
                                         
                                       console.log(el);
                                       /* if(el.opcija==nazivIgrice)
                                        {
                                            console.log(el.innerHTML);
                                        //rez.ApdejtujRezultat(takm1Poeni,takm2Poeni,index1*5);
                                         console.log(index);
                                        }
                                        else
                                         {
                                         index++;
                                        //console.log(index);
                                        }*/
                                        

                                    });
                                   //rez.ApdejtujRezultat(takm1Poeni,takm2Poeni,index1*5+index);
                                }
                                else
                                {
                                    //console.log(index1);
                                   // index1++;
                                   // console.log(index);
                                }
                            });
                            }
                            else
                            {
                                console.log("2");
                            }
                    })

                
             
        }     
                    
                
                
                
    
            
                }
            }

    





