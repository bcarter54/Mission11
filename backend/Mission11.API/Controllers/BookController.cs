using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;

        public BookController(BookDbContext context)
        {
            _context = context;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks()
        {
            var books = _context.Books.ToList();
            
            return Ok(books);
        }
    }
}
