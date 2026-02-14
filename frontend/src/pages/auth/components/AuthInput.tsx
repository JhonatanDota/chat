import { IconType } from "react-icons";
import { UseFormRegisterReturn } from "react-hook-form";

type InputType = "text" | "email" | "password";

interface AuthInput {
  type: InputType;
  placeholder: string;
  icon: IconType;
  error: string | undefined;
  register: UseFormRegisterReturn;
}

export default function AuthInput(props: AuthInput) {
  const { type, placeholder, icon: Icon, error, register } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 p-2.5 border-secondary border-[1.5px] rounded-lg focus-within:border-tertiary focus-within:shadow-sm transition-colors duration-150">
        <Icon className="w-7 h-7 fill-primary-text" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full text-base focus:outline-none bg-inherit"
          autoComplete="off"
          {...register}
        />
      </div>

      {error && <span className="text-sm font-bold text-error">{error}</span>}
    </div>
  );
}
