import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { BrandIcon } from "../../components/BrandIcon";
import { useLogin } from "../../hooks/useLogin";
import {
  loginSchemaData,
  LoginSchemaType,
} from "../../schemas/auth/loginSchema";
import AuthForm from "./AuthForm";
import AuthSectionContainer from "./AuthSectionContainer";
import AuthInput from "./components/AuthInput";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function Login() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchemaData),
  });

  async function onSubmit(data: LoginSchemaType) {
    await loginMutation.mutateAsync(data);

    navigate("/conversations");
  }

  return (
    <AuthSectionContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <BrandIcon />
        </div>

        <div className="flex flex-col gap-3">
          <AuthInput
            type="email"
            placeholder="Por favor, insira seu email"
            icon={MdEmail}
            error={errors.email?.message}
            register={register("email")}
          />

          <AuthInput
            type="password"
            placeholder="Por favor, insira sua senha"
            icon={MdLock}
            error={errors.password?.message}
            register={register("password")}
          />
        </div>

        <AuthSubmitButton text="Entrar" disabled={loginMutation.isPending} />

        <span className="text-center text-sm text-secondary-text">
          Ainda não tem uma conta?{" "}
          <Link className="font-extrabold text-primary-text" to="/register">
            Registre-se!
          </Link>
        </span>
      </AuthForm>
    </AuthSectionContainer>
  );
}
