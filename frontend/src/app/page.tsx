'use client';

import { useEffect, useState } from "react";
import { Book } from "../types/book";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">読書記録一覧</h1>
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book.id} className="border rounded p-4 shadow">
            <div><strong>タイトル：</strong>{book.title}</div>
            <div><strong>著者：</strong>{book.author}</div>
            <div><strong>読了日：</strong>{book.date}</div>
            <div><strong>評価：</strong>{book.rating}</div>
            <div><strong>カテゴリ：</strong>{book.category}</div>
          </li>
        ))}
      </ul>
      {books.length === 0 && <div className="text-gray-500">まだ記録がありません。</div>}
    </div>
  );
}
