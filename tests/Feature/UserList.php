<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserList extends TestCase
{
    use RefreshDatabase;

    /** @test */

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware();
    }

    public function test_it_returns_all_users(): void
    {
        User::factory()->count(5)->create();

        $response = $this->get('/users');

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('Users')
                ->has('users', 5)
        );
    }

    /** @test */
    public function test_it_filters_verified_users(): void
    {
        User::factory()->create(['email_verified_at' => now()]);
        User::factory()->create(['email_verified_at' => null]);

        $response = $this->get('/users?status=verified');

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('Users')
                ->has('users', 1)
        );
    }

    /** @test */
    public function test_it_filters_unverified_users(): void
    {
        User::factory()->create(['email_verified_at' => now()]);
        User::factory()->create(['email_verified_at' => null]);

        $response = $this->get('/users?status=unverified');

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('Users')
                ->has('users', 1)
        );
    }

    /** @test */
    public function test_it_searches_users_by_name_or_email(): void
    {
        User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
        User::factory()->create(['name' => 'Jane Doe', 'email' => 'jane@example.com']);

        $response = $this->get('/users?search=john');

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('Users')
                ->has('users', 1)
        );
    }
}
