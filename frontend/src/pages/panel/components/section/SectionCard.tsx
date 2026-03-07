type SectionCardProps = {
  children: React.ReactNode;
};
export default function SectionCard(props: SectionCardProps) {
  const { children } = props;

  return (
    <div className="flex flex-col gap-3 rounded-lg border-[1px] border-secondary bg-primary p-4">
      {children}
    </div>
  );
}
