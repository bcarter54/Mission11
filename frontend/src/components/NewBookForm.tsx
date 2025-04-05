import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel}: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0
  });

  // This will update the formData with what you've entered 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Don't let the page auto refresh
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    await addBook(formData);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <label htmlFor="">
        Title: <input type="text" name='title' value={formData.title} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Author: <input type="text" name='author' value={formData.author} onChange={handleChange}/> 
      </label>
      <label htmlFor="">
        Publisher: <input type="text" name='publisher' value={formData.publisher} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        ISBN: <input type="string" name='isbn' value={formData.isbn} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Classification: <input type="text" name='classification' value={formData.classification} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Category: <input type="text" name='category' value={formData.category} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Page Count: <input type="number" name='pageCount' value={formData.pageCount} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Price: <input type="number" step={0.01} name='price' value={formData.price} onChange={handleChange}/>
      </label>
      <button type="submit">Add Book</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewBookForm;
