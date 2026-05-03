import { MdSend } from "react-icons/md";

export default function ConversationFooter() {
  return (
    <div className="flex w-full items-center justify-center bg-primary p-2">
      <div className="flex w-full items-center gap-2 md:gap-4">
        <input
          className="w-11/12 rounded-full border-[1px] border-secondary bg-inherit px-3 py-2 text-sm text-primary-text focus:outline-none md:px-4 md:py-3"
          type="text"
          placeholder="Digite sua mensagem"
        />

        <button
          type="button"
          className="rounded-lg bg-tertiary p-2 text-primary-text md:p-3"
        >
          <MdSend className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
