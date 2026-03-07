import { RiCloseLargeFill } from "react-icons/ri";

type DialogProps = {
  children: React.ReactNode;
  close: () => void;
};

export default function Dialog(props: DialogProps) {
  const { children, close } = props;

  return (
    <div className="fixed inset-0 flex items-start justify-center p-4 text-primary-text">
      <div className="absolute inset-0 bg-muted" onClick={close} />

      <div className="relative flex w-full max-w-lg flex-col gap-3 rounded-md border-[1px] border-secondary bg-primary p-6 shadow-lg">
        <button
          onClick={close}
          className="absolute right-4 top-4 font-bold opacity-80 hover:opacity-100"
        >
          <RiCloseLargeFill />
        </button>

        {children}
      </div>
    </div>
  );
}
