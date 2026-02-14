import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { BrandIcon } from "../../components/BrandIcon";
import { handleSuccessAuth } from "../../functions/auth";
import { auth } from "../../requests/authRequests";
import { handleErrors } from "../../requests/handleErrors";
import {
  loginSchemaData,
  LoginSchemaType,
} from "../../schemas/auth/loginSchema";
import AuthForm from "./AuthForm";
import AuthSectionContainer from "./AuthSectionContainer";
import AuthInput from "./components/AuthInput";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchemaData),
  });

  const navigate = useNavigate();
  const [logging, setLogging] = useState<boolean>(false);

  async function onSubmit(data: LoginSchemaType): Promise<void> {
    setLogging(true);

    try {
      const loginResponse = await auth(data);

      handleSuccessAuth(loginResponse.data);
      navigate("/conversation");
    } catch (error) {
      handleErrors(error);
    } finally {
      setLogging(false);
    }
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

        <AuthSubmitButton text="Entrar" disabled={logging} />

        <span className="text-sm text-center text-secondary-text">
          Ainda não tem uma conta?{" "}
          <Link className="font-extrabold text-primary-text" to="/register">
            Registre-se!
          </Link>
        </span>
      </AuthForm>
    </AuthSectionContainer>
  );
}
