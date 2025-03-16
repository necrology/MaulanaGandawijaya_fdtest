<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookList extends TestCase
{
    use RefreshDatabase;


    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware();
    }

    /** @test */
    public function test_it_displays_all_books(): void
    {
        Book::factory()->count(5)->create();

        $response = $this->get('/books');

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('books/Index')
                ->has('books', 5)
        );
    }

    /** @test */
    public function test_it_creates_a_new_book(): void
    {
        $bookData = [
            'title' => 'Sample Book',
            'author' => 'John Doe',
            'description' => 'This is a sample book.',
            'thumbnail' => 'sample.jpg',
            'rating' => 5,
        ];

        $response = $this->post('/books', $bookData);

        $response->assertRedirect('/books');
        $this->assertDatabaseHas('books', $bookData);
    }

    /** @test */
    public function test_it_deletes_a_book(): void
    {
        $book = Book::factory()->create();

        $response = $this->delete("/books/{$book->id}");

        $response->assertRedirect('/books');
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }

    /** @test */
    public function test_it_updates_a_book(): void
    {
        $book = Book::factory()->create();

        $updatedData = [
            'title' => 'Updated Title',
            'author' => 'Updated Author',
            'description' => 'Updated Description',
            'thumbnail' => 'updated.jpg',
            'rating' => 4,
        ];

        $response = $this->put("/books/{$book->id}", $updatedData);

        $response->assertRedirect('/books');
        $this->assertDatabaseHas('books', $updatedData);
    }

    /** @test */
    public function test_it_shows_a_book_detail(): void
    {
        $book = Book::factory()->create();

        $response = $this->get("/books/{$book->id}");

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('books/Show')
                ->where('book.id', $book->id)
        );
    }
}
