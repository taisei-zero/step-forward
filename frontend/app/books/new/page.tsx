'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "../../types/book";

export default function NewBookForm() {
  const [book, setBook] = useState<Omit<Book, 'id'>>({
    title: "",
    author: "",
    date: "",
    rating: 3,
    category: "自己啓発",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBook({
      ...book,
      [e.target.name]: e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // FastAPIがid自動採番に未対応の場合、一時的にクライアントでid生成
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...book,
          id: Date.now(), // 今は仮。サーバー側で採番するなら不要
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push("/books");
    } catch (err) {
      setError("登録に失敗しました");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4 mt-8">
      <h2 className="text-xl font-bold mb-2">📖 新規読書登録</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block mb-1">タイトル</label>
        <input name="title" value={book.title} onChange={handleChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block mb-1">著者</label>
        <input name="author" value={book.author} onChange={handleChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block mb-1">読了日</label>
        <input type="date" name="date" value={book.date} onChange={handleChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block mb-1">評価（1〜5）</label>
        <input type="number" name="rating" min={1} max={5} value={book.rating} onChange={handleChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block mb-1">カテゴリ</label>
        <select name="category" value={book.category} onChange={handleChange} className="w-full border rounded p-2">
          <option value="自己啓発">自己啓発</option>
          <option value="技術書">技術書</option>
          <option value="小説">小説</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">
        登録する
      </button>
    </form>
  );
}
