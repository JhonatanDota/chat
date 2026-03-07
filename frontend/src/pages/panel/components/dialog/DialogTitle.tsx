type DialogTitleProps = {
  title: string;
};
export default function DialogTitle(props: DialogTitleProps) {
  const { title } = props;

  return (
    <h2 className="text-lg font-bold text-primary-text md:text-xl">{title}</h2>
  );
}
