<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\User;

use App\Http\Resources\User\UserResource;

use App\Rules\Fields\User\NameRules;
use App\Rules\Fields\User\PasswordRules;
use App\Rules\Fields\User\UsernameRules;
use App\Rules\Fields\Commom\EmailRules;

class RegisterTest extends TestCase
{
    public function testTryRegisterWithoutName()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O nome é obrigatório.'],
        ]);
    }

    public function testTryRegisterWithTooTinyName()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => Str::random(NameRules::MIN_LENGTH - 1),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O nome deve ter no mínimo ' . NameRules::MIN_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWithTooLongName()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => Str::random(NameRules::MAX_LENGTH + 1),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O nome deve ter no máximo ' . NameRules::MAX_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWithoutEmail()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['O email é obrigatório.'],
        ]);
    }

    public function testTryRegisterWithInvalidEmail()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => 'invalid@mail',
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['O email não é válido.'],
        ]);
    }

    public function testTryRegisterWithEmailTooLong()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => Str::random(EmailRules::MAX_LENGTH + 1) . '@mail.com',
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['O email deve ter no máximo ' . EmailRules::MAX_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWithDuplicatedEmail()
    {
        $email = $this->faker->email();
        $password = $this->faker->password();

        User::factory([
            'email' => $email,
            'password' => $password,
        ])->create();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $email,
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['O email já está sendo usado.'],
        ]);
    }

    public function testTryRegisterWithoutUsername()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário é obrigatório.'],
        ]);
    }

    public function testTryRegisterWithTooTinyUsername()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => Str::random(UsernameRules::MIN_LENGTH - 1),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário deve ter no mínimo ' . UsernameRules::MIN_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWithTooLongUsername()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => Str::random(UsernameRules::MAX_LENGTH + 1),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário deve ter no máximo ' . UsernameRules::MAX_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWithUsernameStartingWithNumber()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => '1username',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário não é válido.'],
        ]);
    }

    public function testTryRegisterWithUsernameStartingWithUnderscore()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => '_username',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário não é válido.'],
        ]);
    }

    public function testTryRegisterWithUsernameStartingWithDot()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => '.username',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário não é válido.'],
        ]);
    }

    public function testTryRegisterWithUsernameContainingUppercaseLetter()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => 'userName',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário não é válido.'],
        ]);
    }

    public function testTryRegisterWithDuplicatedUsername()
    {
        $username = 'validuser';
        $password = $this->faker->password();

        User::factory()->create([
            'username' => $username,
        ]);

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $username,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'username' => ['O nome de usuário já está sendo usado.'],
        ]);
    }

    public function testTryRegisterWithValidUsername()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => 'john.doe_123',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas(User::class, [
            'username' => 'john.doe_123',
        ]);
    }

    public function testTryRegisterWithoutPassword()
    {
        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['A senha é obrigatória.'],
        ]);
    }

    public function testTryRegisterWithoutPasswordConfirmation()
    {
        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $this->faker->password(),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['As senhas não coincidem.'],
        ]);
    }

    public function testTryRegisterWithTooTinyPassword()
    {
        $password = Str::random(PasswordRules::MIN_LENGTH - 1);

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['A senha deve ter no mínimo ' . PasswordRules::MIN_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWithTooLongPassword()
    {
        $password = Str::random(PasswordRules::MAX_LENGTH + 1);

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['A senha deve ter no máximo ' . PasswordRules::MAX_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryRegisterWhenAvatarIsTooLarge()
    {
        $password = fake()->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->userName(),
            'password' => $password,
            'password_confirmation' => $password,
            'avatar' => UploadedFile::fake()->image('avatar.jpg')->size(3000),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'avatar' => ['O avatar deve ter no máximo 2048 KB.'],
        ]);
    }

    public function testTryRegisterWhenAvatarIsInvalidExtension()
    {
        $password = fake()->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->userName(),
            'password' => $password,
            'password_confirmation' => $password,
            'avatar' => UploadedFile::fake()->create('avatar.gif'),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'avatar' => ['O avatar deve ter a extensão de arquivo .jpg, .jpeg, .png.'],
        ]);
    }

    public function testTryRegisterWhenAvatarIsNotImage()
    {
        $password = fake()->password();

        $userData = [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->userName(),
            'password' => $password,
            'password_confirmation' => $password,
            'avatar' => UploadedFile::fake()->create('avatar.pdf'),
        ];

        $response = $this->json('POST', 'api/register/', $userData);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['avatar']);
    }

    public function testRegisterSuccessfullyWithValidAvatar()
    {
        Storage::fake('public');

        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
            'avatar' => UploadedFile::fake()->image('avatar.png'),
        ]);

        $responseData = $response->json();

        $response->assertCreated();

        $user = User::find($responseData['id']);

        $this->assertNotNull($user->avatar);

        Storage::disk('public')->assertExists($user->getRawOriginal('avatar'));
    }

    public function testTryRegisterSuccessfully()
    {
        $password = $this->faker->password();

        $data = [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'username' => $this->faker->userName(),
            'password' => $password,
            'password_confirmation' => $password,
        ];

        $response = $this->json('POST', 'api/register/', $data);
        $responseData = $response->json();

        $response->assertCreated();

        $response->assertExactJson(UserResource::make(User::find($responseData['id']))->resolve());

        $this->assertArrayNotHasKey('password', $responseData);
        $this->assertArrayNotHasKey('password_confirmation', $responseData);

        $this->assertDatabaseHas(User::class, [
            'email' => $data['email'],
        ]);
    }
}
