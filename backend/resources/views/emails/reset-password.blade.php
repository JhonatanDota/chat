@extends('emails.layouts.master')

@section('title', 'Redefinição de Senha - Chat')

@section('content')
    <h2>Olá, {{ $user->name }} 👋</h2>

    <p>Recebemos uma solicitação de redefinição de senha para a sua conta.</p>

    <p>Clique no botão abaixo para escolher uma nova senha:</p>

    <div class="button-wrapper">
        <a href="{{ $url }}" class="button">
            Redefinir Senha
        </a>
    </div>

    <p>Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.</p>
@endsection
