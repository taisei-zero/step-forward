from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 開発中は全部許可でOK。公開時は限定しよう
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    id: int
    title: str
    author: str
    date: str
    rating: int
    category: str

books_db = []

@app.get("/books", response_model=List[Book])
def get_books():
    return books_db

@app.post("/books", response_model=Book)
def create_book(book: Book):
    books_db.append(book)
    return book

@app.delete("/books/{book_id}", response_model=None)
def delete_book(book_id: int):
    # books_dbの中からid一致を探して削除
    for i, book in enumerate(books_db):
        if book.id == book_id:
            del books_db[i]
            return
    raise HTTPException(status_code=404, detail="Book not found")
