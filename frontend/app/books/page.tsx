'use client';

import { useEffect, useState } from "react";
import { Book } from "../types/book";
import Link from "next/link";

const ratingStars = (n: number) =>
  "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n);

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

  if (loading) return <div className="text-center py-10 text-lg text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 読書記録一覧</h1>
      <Link href="/books/new" className="bg-green-500 text-white px-4 py-2 rounded">新規登録</Link>
      {books.length === 0 && (
        <div className="text-gray-400 text-center">まだ記録がありません。</div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{book.title}</span>
              <span className="text-yellow-500 text-lg">{ratingStars(book.rating)}</span>
            </div>
            <div className="text-sm text-gray-500 mb-1">{book.author}</div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>読了日: {book.date}</span>
              <span className="bg-blue-100 text-blue-500 px-2 py-0.5 rounded-md font-medium">{book.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
