import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Sorting from '../components/Sorting';
import { fetchBooks } from '../api/BooksAPI';
import { Book } from '../types/Book';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting by title only
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageCount, pageNum, [], sortOrder);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNum / pageCount));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageCount, pageNum, sortOrder]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <>
    <table className="table table-bordered table-striped">
        <thead className='table-dark'>
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Author</td>
                <td>Publisher</td>
                <td>ISBN</td>
                <td>Classification</td>
                <td>Category</td>
                <td>Page Count</td>
                <td>Price</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
            {books.map((b) => (
                <tr key={b.bookID}>
                    <td>{b.bookID}</td>
                    <td>{b.title}</td>
                    <td>{b.author}</td>
                    <td>{b.publisher}</td>
                    <td>{b.isbn}</td>
                    <td>{b.classification}</td>
                    <td>{b.category}</td>
                    <td>{b.pageCount}</td>
                    <td>{b.price}</td>
                    <td>
                        <button className='btn btn-success'>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
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
};

export default AdminBooksPage;
