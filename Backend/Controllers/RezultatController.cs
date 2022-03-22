using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class RezultatController : ControllerBase
{
    public ProdukcijaContext Context { get; set; }

    public RezultatController(ProdukcijaContext context)
    {
        Context=context;
    }
     [Route("DodajRezultat/{idKviz}/{redPartija}/{nazivIgre}/{poeni1}/{poeni2}")]
   
    [HttpPost]
    public async Task DodajRezultat(int idKviz,int redPartija,string nazivIgre,int poeni1,int poeni2)
        {
          
                Rezultat rez=new Rezultat();
                Kviz kv=await Context.Kvizovi.FirstOrDefaultAsync(b=>b.IDKviza==idKviz);
                rez.kviz=kv;
                Partija par=await Context.Partije.FirstOrDefaultAsync(b=>b.RedniBroj==redPartija);
                rez.partija=par;
                Igrica igr=await Context.Igrice.FirstOrDefaultAsync(b=>b.NazivIgre==nazivIgre);
                rez.igrica=igr;
                //rez.igrica.IDIgrice=igr.IDIgrice;
                rez.takm1Poeni=poeni1;
                rez.takm2Poeni=poeni2;
                Context.Rezultati.Add(rez);
                await Context.SaveChangesAsync();
            
        }
    [Route("PreuzmiRezultat/{idKviz}/{brPartije}")]
    [HttpGet]
    public async Task<List<Rezultat>>PreuzmiRezultat(int idKviz,int brPartije)
    {
      
                var kvizRezultati = Context.Rezultati
                    .Where(p => p.kviz.IDKviza == idKviz)
                    .Where(p=>p.partija.RedniBroj==brPartije);
               var rez=await kvizRezultati.ToListAsync();
                return rez;


    }
    /*[Route("BrisanjePartije/{idPartije}")]
    [HttpDelete]

    public async Task BrisanjePartije(int idPartije,int idKviz)
    {
      
       
        var kvizPartija = Context.Partije.Where(p => p.kviz.IDKviza == idKviz);
        var part = await kvizPartija.FirstOrDefaultAsync(b=>b.IDPartija==idPartije);
        Context.Partije.Remove(part);
        await Context.SaveChangesAsync();


    }*/
    [Route("AzurirajRezultat/{nazivKviza}/{brPartije}/{nazivIgrice}/{poeni1}/{poeni2}")]
    [HttpPut]

    public  async Task AzurirajRezultat(string nazivKviza,int brPartije,string nazivIgrice,int poeni1,int poeni2)
    {

        var rezKviz=Context.Rezultati.Where(p=>p.kviz.NazivKviza==nazivKviza)
                                    .Where(p=>p.partija.RedniBroj==brPartije)
                                    .Where(p=>p.igrica.NazivIgre==nazivIgrice).FirstOrDefault();
                                            
        //var rez=await rezKviz.FirstOrDefaultAsync(p=>p.igrica.NazivIgre==nazivIgrice);                             
         if (rezKviz != null)
                {
                    rezKviz.takm1Poeni=poeni1;
                    rezKviz.takm2Poeni=poeni2;
                    await Context.SaveChangesAsync();
                   
                }
               
        
        
       
       

    }
    
}