type AuthSectionContainerProps = {
  children: React.ReactNode;
};

export default function AuthSectionContainer(props: AuthSectionContainerProps) {
  const { children } = props;

  return (
    <div className="flex min-h-screen -translate-y-10 items-center justify-center p-4 md:-translate-y-16">
      {children}
    </div>
  );
}
