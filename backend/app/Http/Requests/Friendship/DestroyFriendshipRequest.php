<?php

namespace App\Http\Requests\Friendship;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;

use App\Enums\FriendshipRequestStatusEnum;

class DestroyFriendshipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('destroy', $this->route('friendshipRequest'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [];
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

            if ($friendshipRequest->status !== FriendshipRequestStatusEnum::PENDING->value) {
                $validator->errors()->add('friendship_request', 'A solicitação de amizade já foi respondida e não pode ser excluída.');
                return;
            }
        });
    }
}
