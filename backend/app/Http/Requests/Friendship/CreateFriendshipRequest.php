<?php

namespace App\Http\Requests\Friendship;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;

use Illuminate\Validation\Rule;

use App\Models\FriendshipRequest;

class CreateFriendshipRequest extends FormRequest
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
            'to_user_id' => ['required', Rule::exists('users', 'id')],
        ];
    }

    /**
     * With Validator
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return void
     */
    public function withValidator(Validator $validator)
    {
        $validator->after(function (Validator $validator) {
            $user = $this->user();
            $toUserId = $this->input('to_user_id');

            if ($user->id === $toUserId) {
                $validator->errors()->add('to_user_id', 'Não é possível enviar uma solicitação de amizade para você mesmo.');
                return;
            }

            $hasPendingFriendshipRequest = $user->pendingSendedFriendshipRequests()->where('to_user_id', $toUserId)->exists();

            if ($hasPendingFriendshipRequest) {
                $validator->errors()->add('to_user_id', 'Você já possui uma solicitação de amizade pendente com esse usuário.');
                return;
            }
        });
    }

    /**
     * Translated messages for validation errors.
     * 
     * @return array
     */
    public function messages()
    {
        return [
            'to_user_id.required' => 'O campo to_user_id é obrigatório.',
            'to_user_id.exists' => 'O usuário informado não existe.',
        ];
    }
}
