import { UseFormRegisterReturn } from "react-hook-form";
import { FaSyncAlt } from "react-icons/fa";

interface AuthImageInputProps {
  register: UseFormRegisterReturn;
  error?: string;
  preview?: string | null;
  onRemove?: () => void;
}

export default function AuthImageInput(props: AuthImageInputProps) {
  const { register, error, preview, onRemove } = props;

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Foto do usuário"
              className="h-20 w-20 rounded-full object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemove?.();
              }}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-white transition hover:bg-black"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xs text-secondary-text">
            Sem Avatar
          </div>
        )}
      </div>

      <label className="cursor-pointer">
        <FaSyncAlt className="h-4 w-4 fill-success" />
        <input type="file" accept="image/*" className="hidden" {...register} />
      </label>

      {error && <span className="text-sm font-bold text-error">{error}</span>}
    </div>
  );
}
