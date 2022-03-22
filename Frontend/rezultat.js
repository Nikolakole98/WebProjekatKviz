export class Rezultat{

constructor(kviz,brojPartija,igrica,Takm1_poeni,Takm2_poeni)
{
   this.kviz=kviz;
    this.brojPartija=brojPartija;
    this.igrica=igrica;
    this.Takm1_poeni=Takm1_poeni;
    this.Takm2_poeni=Takm2_poeni;
}


ApdejtujRezultat(p1,p2,indPart)
{ 
    
    var poljeIgrica=document.querySelectorAll(".partijaIgrice");
    var d1=poljeIgrica[indPart].querySelectorAll(".poeniTakm1");
    d1[indPart].innerText=p1;
    d1[indPart].className="poeniTakm12";
    var d2= poljeIgrica[indPart].querySelectorAll(".poeniTakm2");
    d2[indPart].innerText=p2;
    d2[indPart].className="poeniTakm22";

  /*  var u1=document.querySelectorAll(".ukupnoTakm1");
    u1[br].innerHTML=p1;
    var u2=document.querySelectorAll(".ukupnoTakm2");
    u2[br].innerHTML=p2;*/
    
    
}




}