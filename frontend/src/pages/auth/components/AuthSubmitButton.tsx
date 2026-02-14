interface AuthSubmitButtonProps {
  text: string;
  disabled: boolean;
}

export default function AuthSubmitButton(props: AuthSubmitButtonProps) {
  const { text, disabled } = props;

  return (
    <button
      type="submit"
      className="p-2.5 text-base font-bold uppercase text-white bg-tertiary rounded-md disabled:animate-pulse"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
