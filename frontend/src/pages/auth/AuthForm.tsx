type AuthFormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
};

export default function AuthForm(props: AuthFormProps) {
  const { onSubmit } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-6 rounded-md p-4 md:p-6"
    >
      {props.children}
    </form>
  );
}
