import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  MdAccountCircle,
  MdEmail,
  MdLock,
  MdLockReset,
  MdPerson2,
} from "react-icons/md";
import { Link } from "react-router-dom";

import { BrandIcon } from "../../components/BrandIcon";
import { register as registerRequest } from "../../requests/authRequests";
import { handleErrors } from "../../requests/handleErrors";
import {
  registerSchemaData,
  RegisterSchemaType,
} from "../../schemas/auth/registerSchema";
import AuthForm from "./AuthForm";
import AuthSectionContainer from "./AuthSectionContainer";
import AuthInput from "./components/AuthInput";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchemaData),
  });

  const [registering, setRegistering] = useState<boolean>(false);

  async function onSubmit(data: RegisterSchemaType): Promise<void> {
    setRegistering(true);

    try {
      await registerRequest(data);

      reset();
      toast.success("Registrado com sucesso!");
    } catch (error) {
      handleErrors(error);
    } finally {
      setRegistering(false);
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
            type="text"
            placeholder="Nome"
            icon={MdPerson2}
            error={errors.name?.message}
            register={register("name")}
          />

          <AuthInput
            type="email"
            placeholder="Email"
            icon={MdEmail}
            error={errors.email?.message}
            register={register("email")}
          />

          <AuthInput
            type="text"
            placeholder="Username"
            icon={MdAccountCircle}
            error={errors.username?.message}
            register={register("username")}
          />

          <AuthInput
            type="password"
            placeholder="Senha"
            icon={MdLock}
            error={errors.password?.message}
            register={register("password")}
          />

          <AuthInput
            type="password"
            placeholder="Confirme a senha"
            icon={MdLockReset}
            error={errors.passwordConfirmation?.message}
            register={register("passwordConfirmation")}
          />
        </div>

        <AuthSubmitButton text="Registrar" disabled={registering} />

        <span className="text-center text-sm text-secondary-text">
          Já tem uma conta?{" "}
          <Link className="font-bold text-primary-text" to="/login">
            Faça o Login!
          </Link>
        </span>
      </AuthForm>
    </AuthSectionContainer>
  );
}
