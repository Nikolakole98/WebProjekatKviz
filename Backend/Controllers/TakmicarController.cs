using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class TakmicarController : ControllerBase
{
    public ProdukcijaContext Context { get; set; }

    public TakmicarController(ProdukcijaContext context)
    {
        Context=context;
    }
  [Route("DodajTakmicara/{idKviza}/{ime}/{prezime}/{godinaRodj}/{zanimanje}")]
    [HttpPost]
    public async Task DodajTakmicara(int idKviza,string ime,string prezime,int godinaRodj,string zanimanje)
        {
           Takmicar takm=await Context.Takmicari.Where(p=>p.Ime==ime).FirstOrDefaultAsync();
           /* if(takm!=null)
            {
                 BadRequest("Vec je dodat ovaj takmicar");
            }
            else
            {*/
                Takmicar takmicar=new Takmicar();
                takmicar.Ime=ime;
                takmicar.Prezime=prezime;
                takmicar.GodinaRodjenja=godinaRodj;
                takmicar.Zanimanje=zanimanje;
                takmicar.OdigranePartije=0;
                takmicar.BrojPoena=0;
                Kviz kv=await Context.Kvizovi.FirstOrDefaultAsync(b=>b.IDKviza==idKviza);
                takmicar.kviz=kv;
               // takmicar.PartTakm=null;

                 Context.Takmicari.Add(takmicar);
                await Context.SaveChangesAsync();
         //   }
        }

   /* [Route("PreuzmiTakmicare/{idKviza}")]
    [HttpGet]
    public async Task<List<Takmicar>>PreuzmiTakmicare(int idKviz)
    {
      
                var kvizTakmicari = Context.Takmicari
                    .Where(p => p.kviz.IDKviza==idKviz);
                var takm = await kvizTakmicari.ToListAsync();
                return takm;
             
    }*/
    [Route("PreuzmiTakmicare/{idKviza}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiTakmicare([FromRoute] int idKviza)
        {
            try
            {
                var kvizTakmicari = Context.Takmicari
                    .Where(p => p.kviz.IDKviza == idKviza);
                var takmicar = await kvizTakmicari.ToListAsync();

                return Ok
                (
                    takmicar.Select(p =>
                    new
                    {
                        Ime=p.Ime,
                        Prezime=p.Prezime,
                        GodinaRodjenja=p.GodinaRodjenja,
                        Zanimanje=p.Zanimanje,
                        OdigranePartije=p.OdigranePartije,
                        BrojPoena=p.BrojPoena,
                        kviz=p.kviz
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


   
    [Route("BrisanjeTakmicara/{idTakmicar}")]
    [HttpDelete]

    public async Task BrisanjeTakmicara(int idTakmicar,int idKviz)
    {
      // Kviz kv=await Context.Kvizovi.FirstOrDefaultAsync(b=>b.IDKviza==idKviz);
       
        var kvizTakmicari = Context.Takmicari.Where(p => p.kviz.IDKviza == idKviz);
        var takm = await kvizTakmicari.FirstOrDefaultAsync(b=>b.IDTakmicar==idTakmicar);
        Context.Takmicari.Remove(takm);
        await Context.SaveChangesAsync();


    }
}
