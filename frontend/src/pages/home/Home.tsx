import {
  MdChatBubbleOutline,
  MdNotificationsNone,
  MdPeopleOutline,
  MdSecurity,
} from "react-icons/md";
import { Link } from "react-router-dom";

import FeatureHighlight from "./components/FeatureHighlight";

export default function Home() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5 p-4 md:mx-auto md:w-2/3 md:gap-8">
      <h3 className="text-center text-4xl font-bold text-white md:text-5xl">
        Converse em tempo real de forma simples, rápida e segura.
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        <FeatureHighlight
          icon={MdChatBubbleOutline}
          title="Mensagens instantâneas"
          text="Envie e receba mensagens em tempo real com uma experiência fluida."
        />

        <FeatureHighlight
          icon={MdPeopleOutline}
          title="Conecte-se com pessoas"
          text="Adicione amigos e comece conversas privadas facilmente."
        />

        <FeatureHighlight
          icon={MdNotificationsNone}
          title="Notificações em tempo real"
          text="Seja avisado imediatamente quando receber novas mensagens."
        />

        <FeatureHighlight
          icon={MdSecurity}
          title="Privacidade e segurança"
          text="Suas conversas protegidas com segurança e controle de acesso."
        />
      </div>

      <Link to="/login">
        <button className="rounded-md bg-blue-500 p-4 text-base font-extrabold uppercase text-white md:text-lg">
          COMEÇAR A CONVERSAR
        </button>
      </Link>
    </div>
  );
}
