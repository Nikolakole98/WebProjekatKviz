using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class KvizController : ControllerBase
{
    public ProdukcijaContext Context { get; set; }

    public KvizController(ProdukcijaContext context)
    {
        Context=context;
    }
    [Route("DodajKviz")]
    [HttpPost]
    public async Task DodajKviz(string nazivKviza,int brPart,int brIgrica,int brTakm)
    {
        /*Context.Kvizovi.Add(kviz);
        await Context.SaveChangesAsync();*/
         Kviz kv=await Context.Kvizovi.Where(p=>p.NazivKviza==nazivKviza).FirstOrDefaultAsync();
            if(kv!=null)
            {
                 BadRequest("Ovaj kviz vec postoji");
            }
            else
            {
                Kviz kviz=new Kviz();
                kviz.NazivKviza=nazivKviza;
                kviz.BrojIgara=brIgrica;
                kviz.BrojPartija=brPart;
                kviz.BrojTakmicara=brTakm;
                
                 Context.Kvizovi.Add(kviz);
                await Context.SaveChangesAsync();
            }
        }
    
    [Route("BrisanjeKviza")]
    [HttpDelete]
    public async Task BrisanjeKviza(int id)
    {
       var kviz = Context.Kvizovi.Where(p => p.IDKviza == id).FirstOrDefault();
                var partije = await Context.Partije.Where(x => x.kviz == kviz).ToListAsync();
                partije.ForEach(part =>
                {
                    Context.Partije.Remove(part);
                });
                var takmicari = await Context.Takmicari.Where(p => p.kviz == kviz).ToListAsync();
                takmicari.ForEach(osobe =>
                {
                    Context.Takmicari.Remove(osobe);
                });
                var igrice = await Context.Igrice.Where(p => p.kviz == kviz).ToListAsync();
                igrice.ForEach(igra =>
                {
                    Context.Igrice.Remove(igra);
                });
                var rezultati = await Context.Rezultati.Where(p => p.kviz == kviz).ToListAsync();
                rezultati.ForEach(rez =>
               {
                   Context.Rezultati.Remove(rez);
               });

                string naz = kviz.NazivKviza;
                int brPart=kviz.BrojPartija;
                int brIgrica=kviz.BrojIgara;
                int brTakm=kviz.BrojTakmicara;
                Context.Kvizovi.Remove(kviz);
                await Context.SaveChangesAsync();
    }
}    

