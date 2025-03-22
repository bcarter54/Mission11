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
        public IActionResult GetBooks(int pageCount = 10, int pageNum = 1, string sortOrder = "asc")
        {
            var query = _context.Books.AsQueryable();

            // Always sort by title
            query = sortOrder.ToLower() == "asc"
                ? query.OrderBy(b => b.Title)
                : query.OrderByDescending(b => b.Title);

            var books = query
                .Skip((pageNum - 1) * pageCount)
                .Take(pageCount)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            return Ok(new { Books = books, TotalNum = totalNumBooks });
        }

    }
}
