<?php

namespace Tests\Feature\User;

use Tests\TestCase;

use App\Models\User;

use App\Http\Resources\User\PublicUserResource;

class GetUserTest extends TestCase
{
    public function testTryGetUserRouteNotLogged()
    {
        $response = $this->json('GET', 'api/users/1');

        $response->assertUnauthorized();
    }

    public function testTryGetUserByIdWithUnkownUserId()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/users/0');

        $response->assertNotFound();
    }

    public function testTryGetUserByUsernameWithUnkownUsername()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/users/dotinha99');

        $response->assertNotFound();
    }

    public function testGetUserByIdSuccessfully()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        $response = $this->json('GET', 'api/users/' . $user->id);

        $response->assertOk();
        $response->assertExactJson(PublicUserResource::make($user)->resolve());
    }

    public function testGetUserByUsernameSuccessfully()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        $response = $this->json('GET', 'api/users/' . $user->username);

        $response->assertOk();
        $response->assertExactJson(PublicUserResource::make($user)->resolve());
    }
}
