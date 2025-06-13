from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

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
