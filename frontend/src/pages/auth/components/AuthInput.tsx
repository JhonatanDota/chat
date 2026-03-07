import { UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";

type InputType = "text" | "email" | "password";

interface AuthInputProps {
  type: InputType;
  placeholder: string;
  icon: IconType;
  error: string | undefined;
  register: UseFormRegisterReturn;
}

export default function AuthInput(props: AuthInputProps) {
  const { type, placeholder, icon: Icon, error, register } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 rounded-lg border-[1.5px] border-secondary p-2.5 transition-colors duration-150 focus-within:border-tertiary focus-within:shadow-sm">
        <Icon className="h-7 w-7 fill-primary-text" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-inherit text-base text-primary-text focus:outline-none"
          autoComplete="off"
          {...register}
        />
      </div>

      {error && <span className="text-sm font-bold text-error">{error}</span>}
    </div>
  );
}
