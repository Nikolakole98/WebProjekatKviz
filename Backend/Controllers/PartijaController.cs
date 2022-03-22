using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class PartijaController : ControllerBase
{
    public ProdukcijaContext Context { get; set; }

    

    public PartijaController(ProdukcijaContext context)
    {
        Context=context;
        

    }
 
    [Route("DodajPartiju/{idKviza}/{redniBr}/{dan}/{mesec}/{godina}/{ime1}/{prezime1}/{ime2}/{prezime2}")]
    [HttpPost]
    public async Task DodajPartiju(int idKviza,int redniBr,int dan,string mesec,int godina,string ime1,string prezime1,string ime2,string prezime2)
        {
           Partija part=await Context.Partije.Where(p=>p.RedniBroj==redniBr).FirstOrDefaultAsync();
            if(part!=null)
            {
               
                 BadRequest("Vec je dodata ova partija");
            }
            else
            {
                Partija part1=new Partija();
                part1.RedniBroj=redniBr;
                part1.Dan=dan;
                part1.Mesec=mesec;
                part1.Godina=godina;
                Takmicar tak1=await Context.Takmicari.Where(p=>p.Ime==ime1).Where(p=>p.Prezime==prezime1).FirstOrDefaultAsync();
                part1.Takmicar1=tak1;
              
               Takmicar tak2=await Context.Takmicari.Where(p=>p.Ime==ime2).Where(p=>p.Prezime==prezime2).FirstOrDefaultAsync();
                part1.Takmicar2=tak2;
              
                Kviz kv=await Context.Kvizovi.FirstOrDefaultAsync(b=>b.IDKviza==idKviza);
                part1.kviz=kv;
              

                 Context.Partije.Add(part1);
                await Context.SaveChangesAsync();
            }
        }

    [Route("PreuzmiPartije/{idKviz}")]
    [HttpGet]
    public async Task<List<Partija>>PreuzmiPartije(int idKviz)
    {
      
                var kvizPartije = Context.Partije
                    .Where(p => p.kviz.IDKviza == idKviz);
                var part = await kvizPartije.ToListAsync();
                return part;
             
    }
    [Route("BrisanjePartije/{idKviz}/{redPartije}")]
    [HttpDelete]

    public async Task BrisanjePartije(int redPartije,int idKviz)
    {
    
       var kviz = Context.Kvizovi.Where(p => p.IDKviza == idKviz).FirstOrDefault();
           // var partije = await Context.Partije.Where(x => x.kviz == kviz).FirstOrDefault();
             var partija=Context.Partije.Where(p=>p.RedniBroj==redPartije)
                                            .Where(x=>x.kviz==kviz).FirstOrDefault();  
               
                var rezultati = await Context.Rezultati.Where(p => p.kviz == kviz)
                .Where(p=>p.partija.RedniBroj==redPartije).ToListAsync();
                rezultati.ForEach(rez =>
               {
                   Context.Rezultati.Remove(rez);
               });

                int redniBr=partija.RedniBroj;
                int dan=partija.Dan;
                string mesec=partija.Mesec;
                int god=partija.Godina;
                Context.Partije.Remove(partija);
                await Context.SaveChangesAsync();
    
    }
    }
    
