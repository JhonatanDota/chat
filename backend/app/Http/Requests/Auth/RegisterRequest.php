<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

use App\Rules\Validations\PatternsValidation;
use App\Rules\Fields\User\NameRules;
use App\Rules\Fields\User\PasswordRules;
use App\Rules\Fields\User\UsernameRules;
use App\Rules\Fields\Commom\EmailRules;

use App\Models\User;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'min:' . NameRules::MIN_LENGTH, 'max:' . NameRules::MAX_LENGTH],
            'email' => ['required', 'string', 'email', 'max:' . EmailRules::MAX_LENGTH, 'regex:' . PatternsValidation::EMAIL_WITH_TLD,  Rule::unique(User::class, 'email')],
            'username' => ['required', 'string', 'min:' . UsernameRules::MIN_LENGTH, 'max:' . UsernameRules::MAX_LENGTH, 'regex:' . PatternsValidation::USERNAME, Rule::unique(User::class, 'username')],
            'avatar' => ['nullable', File::image()->types(['jpeg', 'jpg', 'png'])->max(2048)],
            'password' => ['required', 'string', 'min:' . PasswordRules::MIN_LENGTH, 'max:' . PasswordRules::MAX_LENGTH, 'confirmed']
        ];
    }

    /**
     * Get the custom messages for the validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome deve ser uma string.',
            'name.min' => 'O nome deve ter no mínimo ' . NameRules::MIN_LENGTH . ' caracteres.',
            'name.max' => 'O nome deve ter no máximo ' . NameRules::MAX_LENGTH . ' caracteres.',

            'email.required' => 'O email é obrigatório.',
            'email.string' => 'O email deve ser uma string.',
            'email.email' => 'O email não é válido.',
            'email.max' => 'O email deve ter no máximo ' . EmailRules::MAX_LENGTH . ' caracteres.',
            'email.regex' => 'O email não é válido.',
            'email.unique' => 'O email já está sendo usado.',

            'username.required' => 'O nome de usuário é obrigatório.',
            'username.string' => 'O nome de usuário deve ser uma string.',
            'username.min' => 'O nome de usuário deve ter no mínimo ' . UsernameRules::MIN_LENGTH . ' caracteres.',
            'username.max' => 'O nome de usuário deve ter no máximo ' . UsernameRules::MAX_LENGTH . ' caracteres.',
            'username.regex' => 'O nome de usuário não é válido.',
            'username.unique' => 'O nome de usuário já está sendo usado.',

            'avatar.image' => 'O avatar deve ser uma imagem.',
            'avatar.max' => 'O avatar deve ter no máximo 2048 KB.',
            'avatar.mimes' => 'O avatar deve ter a extensão de arquivo .jpg, .jpeg, .png.',

            'password.required' => 'A senha é obrigatória.',
            'password.string' => 'A senha deve ser uma string.',
            'password.min' => 'A senha deve ter no mínimo ' . PasswordRules::MIN_LENGTH . ' caracteres.',
            'password.max' => 'A senha deve ter no máximo ' . PasswordRules::MAX_LENGTH . ' caracteres.',
            'password.confirmed' => 'As senhas não coincidem.',
        ];
    }
}
