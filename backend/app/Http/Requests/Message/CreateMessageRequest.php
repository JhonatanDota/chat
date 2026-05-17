<?php

namespace App\Http\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

use App\Rules\Fields\MessageRules;

class CreateMessageRequest extends FormRequest
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
            'content' => ['required', 'string', 'min:' . MessageRules::MIN_LENGTH, 'max:' . MessageRules::MAX_LENGTH],
        ];
    }

    /**
     * Translated messages for validation errors.
     * 
     * @return array
     */
    public function messages()
    {
        return [
            'content.required' => 'O campo content é obrigatório.',
            'content.min' => 'O campo content deve ter pelo menos ' . MessageRules::MIN_LENGTH . ' caracteres.',
            'content.max' => 'O campo content não pode ter mais que ' . MessageRules::MAX_LENGTH . ' caracteres.',
        ];
    }
}
