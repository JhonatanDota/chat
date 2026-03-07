interface AuthSubmitButtonProps {
  text: string;
  disabled: boolean;
}

export default function AuthSubmitButton(props: AuthSubmitButtonProps) {
  const { text, disabled } = props;

  return (
    <button
      type="submit"
      className="rounded-md bg-tertiary p-2.5 text-base font-bold uppercase text-white disabled:animate-pulse"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
