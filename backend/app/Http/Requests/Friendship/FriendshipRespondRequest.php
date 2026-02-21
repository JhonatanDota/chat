<?php

namespace App\Http\Requests\Friendship;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;

use App\Enums\FriendshipRequestStatusEnum;

class FriendshipRespondRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('respond', $this->route('friendshipRequest'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'status' => ['required', Rule::in([
                FriendshipRequestStatusEnum::ACCEPTED->value,
                FriendshipRequestStatusEnum::DECLINED->value,
            ])],
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
            $friendshipRequest = $this->route('friendshipRequest');

            if (!$friendshipRequest->isPending()) {
                $validator->errors()->add('to_user_id', 'Essa solicitação de amizade já foi respondida.');
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
            'status.required' => 'O campo status é obrigatório.',
            'status.in' => 'O campo status é inválido.',
        ];
    }
}
