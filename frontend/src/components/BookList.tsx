import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { fetchBooks } from '../api/BooksAPI';
import Sorting from './Sorting';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting by title only
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageCount,
          pageNum,
          selectedCategories,
          sortOrder
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNum / pageCount));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageCount, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
                    <li>
                      <strong>Author: </strong>
                      {b.author}
                    </li>
                    <li>
                      <strong>Publisher: </strong>
                      {b.publisher}
                    </li>
                    <li>
                      <strong>ISBN: </strong>
                      {b.isbn}
                    </li>
                    <li>
                      <strong>Classification: </strong>
                      {b.classification}
                    </li>
                    <li>
                      <strong>Category: </strong>
                      {b.category}
                    </li>
                    <li>
                      <strong>Page Count: </strong>
                      {b.pageCount}
                    </li>
                    <li>
                      <strong>Price: </strong>${b.price}
                    </li>
                  </ul>
                  <button
                    className="btn btn-success w-100 mt-auto"
                    onClick={() =>
                      navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageCount}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageCount(newSize);
          setPageNum(1);
        }}
      />
      Sort Order:
      <Sorting
        sortOrder={sortOrder}
        onSortOrderChange={(newOrder) => setSortOrder(newOrder)}
      />
      <p>Current Sort Order: {sortOrder}</p>
    </>
  );
}

export default BookList;
