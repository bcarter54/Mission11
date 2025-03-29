import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting by title only
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageCount=${pageCount}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalItems(data.totalNum);
      setTotalPages(Math.ceil(data.totalNum / pageCount));
    };
    fetchBooks();
  }, [pageCount, pageNum, sortOrder, selectedCategories]);

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column">
          {books.map((b) => (
            <div className="mb-4" key={b.bookID}>
              <div className="card shadow p-3" style={{ width: '18rem' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ whiteSpace: 'normal' }}>
                    {b.title}
                  </h5>
                  <ul className="list-unstyled flex-grow-1">
                    <li><strong>Author:</strong> {b.author}</li>
                    <li><strong>Price:</strong> ${b.price}</li>
                  </ul>
                  <button className="btn btn-success w-100 mt-auto" 
                    onClick={() => navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination-controls mt-4">
        <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === totalPages}>
          Next
        </button>
      </div>

      <br />
      <label>
        Results per page:
        <select
          value={pageCount}
          onChange={(e) => {
            setPageCount(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <br />
      <label>
        Sort Order:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending (A-Z)</option>
          <option value="desc">Descending (Z-A)</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
