import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting by title only

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageCount=${pageCount}&pageNum=${pageNum}&sortOrder=${sortOrder}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalItems(data.totalNum);
      setTotalPages(Math.ceil(data.totalNum / pageCount));
    };
    fetchBooks();
  }, [pageCount, pageNum, sortOrder]);

  return (
    <>

      {books.map((b) => (
        <div id="projectCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>{b.author}
              </li>
              <li>
                <strong>Publisher: </strong>{b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>{b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>{b.classification}
              </li>
              <li>
                <strong>Category: </strong>{b.category}
              </li>
              <li>
                <strong>Page Count: </strong>{b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>{b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === index + 1}>
          {index + 1}
        </button>
      ))}

      <button onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === totalPages}>
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select value={pageCount} onChange={(e) => { setPageCount(Number(e.target.value)); setPageNum(1); }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <br />
      <label>
        Sort Order:
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending (A-Z)</option>
          <option value="desc">Descending (Z-A)</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
