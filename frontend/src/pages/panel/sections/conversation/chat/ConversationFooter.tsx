import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";

import { useSendMessage } from "../../../../../hooks/useSendMessage";
import {
  sendMessageSchemaData,
  SendMessageSchemaType,
} from "../../../schemas/sendMessageSchema";

type ConversationFooterProps = {
  conversationId: number;
};

export default function ConversationFooter(props: ConversationFooterProps) {
  const { conversationId } = props;

  const { mutate, isPending: sendingMessage } = useSendMessage();

  const { register, handleSubmit, watch, reset } =
    useForm<SendMessageSchemaType>({
      resolver: zodResolver(sendMessageSchemaData),
    });

  const content = watch("content");

  function onSubmit(data: SendMessageSchemaType) {
    mutate({
      conversationId: conversationId,
      content: data.content,
    });

    reset();
  }

  return (
    <div className="flex w-full items-center justify-center bg-primary p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 md:gap-4"
      >
        <input
          {...register("content")}
          className="w-11/12 rounded-full border-[1px] border-secondary bg-inherit px-3 py-2 text-sm text-primary-text focus:outline-none md:px-4 md:py-3"
          type="text"
          placeholder="Digite sua mensagem"
          autoComplete="off"
        />

        <button
          type="submit"
          className="rounded-lg bg-tertiary p-2 text-primary-text transition-opacity disabled:opacity-50 md:p-3"
          disabled={sendingMessage || !content}
        >
          <MdSend className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
