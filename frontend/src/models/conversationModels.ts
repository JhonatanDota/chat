import { PublicUserModel } from "./userModels";

export type ConversationModel = {
  id: number;
  createdAt: Date;
};

export type MessageModel = {
  id: number;
  userId: number;
  conversationId: number;
  content: string;
  createdAt: Date;
};

export type ConversationPreviewModel = ConversationModel & {
  user: PublicUserModel;
  lastMessage: MessageModel | null;
};
