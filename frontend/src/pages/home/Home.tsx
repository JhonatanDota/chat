import {
  MdCloudQueue,
  MdOutlineFileDownload,
  MdQrCode2,
  MdRestaurantMenu,
} from "react-icons/md";
import { Link } from "react-router-dom";

import FeatureHighlight from "./components/FeatureHighlight";

export default function Home() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5 p-4 md:mx-auto md:w-2/3 md:gap-8">
      <h3 className="md:text-5x text-center text-4xl font-bold text-white">
        Crie e gerencie cardápios online de forma simples e profissional.
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        <FeatureHighlight
          icon={MdRestaurantMenu}
          title="Monte seu cardápio"
          text="Cadastre pratos, bebidas, descrições e preços de forma rápida e intuitiva."
        />

        <FeatureHighlight
          icon={MdQrCode2}
          title="Compartilhe com QR Code"
          text="Gere um QR Code para seus clientes acessarem o cardápio direto pelo celular."
        />

        <FeatureHighlight
          icon={MdCloudQueue}
          title="Atualize em tempo real"
          text="Altere preços e itens a qualquer momento, sem precisar reimprimir."
        />

        <FeatureHighlight
          icon={MdOutlineFileDownload}
          title="Exporte seu cardápio"
          text="Baixe seu cardápio em PDF ou imagem para usar onde quiser."
        />
      </div>

      <Link to="/login">
        <button className="rounded-md bg-orange-500 p-4 text-base font-extrabold uppercase text-white md:text-lg">
          CRIAR MEU CARDÁPIO
        </button>
      </Link>
    </div>
  );
}
