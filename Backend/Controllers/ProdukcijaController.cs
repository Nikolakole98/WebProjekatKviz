using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
public class ProdukcijaController : ControllerBase
{
    public ProdukcijaContext Context { get; set; }

    public ProdukcijaController(ProdukcijaContext context)
    {
        Context=context;
    }
    [Route("PreuzimanjeKvizova")]
    [HttpGet]
    public async Task<List<Kviz>>PreuzimanjeKvizova()
    {
        return await Context.Kvizovi.ToListAsync();

    }
    
}
