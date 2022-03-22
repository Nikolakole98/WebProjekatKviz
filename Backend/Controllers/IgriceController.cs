using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class IgriceController : ControllerBase
{
    public ProdukcijaContext Context { get; set; }

    public IgriceController(ProdukcijaContext context)
    {
        Context=context;
    }
    [Route("DodajIgricu")]
    [HttpPost]
    public async Task DodajIgricu(int idKviz,string naziv,int poeni1,int poeni2)
        {
           Igrica igr=await Context.Igrice.Where(p=>p.NazivIgre==naziv).FirstOrDefaultAsync();
           /* if(igr!=null)
            {
                 BadRequest("Vec je dodat ova igrica");
            }
            else
            {*/
                Igrica igrica=new Igrica();
                igrica.NazivIgre=naziv;
                igrica.Poeni1=poeni1;
                igrica.Poeni2=poeni2;
                Kviz kv=await Context.Kvizovi.FirstOrDefaultAsync(b=>b.IDKviza==idKviz);
                igrica.kviz=kv;
                 Context.Igrice.Add(igrica);
                await Context.SaveChangesAsync();
           // }
        }
    [Route("PreuzmiIgrice/{idKviz}")]
    [HttpGet]
    public async Task<List<Igrica>>PreuzmiIgriceKviz(int idKviz)
    {
      
                var kvizIgrice = Context.Igrice
                    .Where(p => p.kviz.IDKviza == idKviz);
                var takm = await kvizIgrice.ToListAsync();
                return takm;
             
    }
   /* [Route("PreuzmiIgricePartija/{idKviz}/{redPartija}")]
    [HttpGet]
    public async Task<List<Igrica>>PreuzmiIgrice(int idKviz,int redPartija)
    {
      
                var kvizIgrice = Context.Igrice
                    .Where(p => p.kviz.IDKviza == idKviz)
                    .Where(p=>p.partija.RedniBroj==redPartija);
                var takm = await kvizIgrice.ToListAsync();
                return takm;
             
    }*/
    [Route("BrisanjeIgrice/{idIgrice}")]
    [HttpDelete]

    public async Task BrisanjeIgrice(int idIgrice,int idKviz)
    {
      
       
        var kvizIgrice = Context.Igrice.Where(p => p.kviz.IDKviza == idKviz);
        var igr = await kvizIgrice.FirstOrDefaultAsync(b=>b.IDIgrice==idIgrice);
        Context.Igrice.Remove(igr);
        await Context.SaveChangesAsync();


    }

  /*  [Route("AzurirajIgricu/{nazivKviza}/{brPartije}/{nazivIgrice}/{poeni1}/{poeni2}")]
    [HttpPut]

    public  async Task AzurirajIgricu(string nazivKviza,int brPartije,string nazivIgrice,int poeni1,int poeni2)
    {

        var rezKviz=Context.Igrice.Where(p=>p.kviz.NazivKviza==nazivKviza)
                                    .Where(p=>p.partija.RedniBroj==brPartije)
                                    .Where(p=>p.NazivIgre==nazivIgrice).FirstOrDefault();
                                            
        //var rez=await rezKviz.FirstOrDefaultAsync(p=>p.igrica.NazivIgre==nazivIgrice);                             
         if (rezKviz != null)
                {
                    rezKviz.Poeni1=poeni1;
                    rezKviz.Poeni2=poeni2;
                    await Context.SaveChangesAsync();
                   
                }
               
        
        
       
       

    }*/
}
