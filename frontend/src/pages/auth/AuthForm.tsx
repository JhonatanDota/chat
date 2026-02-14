type AuthFormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
};

export default function AuthForm(props: AuthFormProps) {
  const { onSubmit } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full max-w-md gap-6 p-4 rounded-md md:p-6"
    >
      {props.children}
    </form>
  );
}
