type EmptyDataMessageProps = {
  message: string;
};

export default function EmptyDataMessage(props: EmptyDataMessageProps) {
  const { message } = props;

  return <p className="text-center text-sm text-secondary-text">{message}</p>;
}
