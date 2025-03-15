<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return Inertia::render('books/Index', ['books' => $books]);
    }

    public function create()
    {
        return Inertia::render('books/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Book::create($request->all());

        return redirect()->route('books');
    }

    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return back()->withErrors(['message' => 'Buku tidak ditemukan.']);
        }

        $book->delete();

        return redirect()->route('books')->with('success', 'Buku berhasil dihapus.');
    }

    public function edit($id)
    {
        $book = Book::findOrFail($id);
        return Inertia::render('books/Edit', [
            'book' => $book
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required',
            'thumbnail' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $book = Book::findOrFail($id);
        $book->update($request->all());

        return redirect()->route('books')->with('success', 'Buku berhasil diperbarui.');
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);
        return Inertia::render('books/Show', [
            'book' => $book
        ]);
    }

    public function showDetail($id)
    {
        $book = Book::findOrFail($id);
        return inertia('BookDetail', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'book' => $book
        ]);
    }
}
