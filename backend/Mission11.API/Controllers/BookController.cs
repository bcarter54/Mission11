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
        public IActionResult GetBooks(int pageCount = 10, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Always sort by title
            query = sortOrder.ToLower() == "asc"
                ? query.OrderBy(b => b.Title)
                : query.OrderByDescending(b => b.Title);

            var books = query
                .Skip((pageNum - 1) * pageCount)
                .Take(pageCount)
                .ToList();

            var totalNumBooks = query.Count();

            return Ok(new { Books = books, TotalNum = totalNumBooks });
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes= _context.Books.Select(b => b.Category).Distinct().ToList();
            
            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }
        
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateProject(int bookID, [FromBody] Book updatedBook)
        {
            var exisitingBook = _context.Books.Find(bookID);
            
            exisitingBook.Title = updatedBook.Title;
            exisitingBook.Author = updatedBook.Author;
            exisitingBook.Publisher = updatedBook.Publisher;
            exisitingBook.ISBN = updatedBook.ISBN;
            exisitingBook.Classification = updatedBook.Classification;
            exisitingBook.Category = updatedBook.Category;
            exisitingBook.PageCount = updatedBook.PageCount;
            exisitingBook.Price = updatedBook.Price;

            
            _context.Books.Update(exisitingBook);
            _context.SaveChanges();
            
            return Ok(updatedBook);
        }
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteProject(int bookID)
        {
            var project = _context.Books.Find(bookID);

            if (project == null)
            {
                return NotFound(new {message = "Not found"});
            }
            
            _context.Books.Remove(project);
            _context.SaveChanges();
            
            return NoContent();
        }

    }
}
