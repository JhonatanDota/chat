import { Link } from "react-router-dom";
import FeatureHighlight from "./components/FeatureHighlight";

import {
  MdRestaurantMenu,
  MdQrCode2,
  MdCloudQueue,
  MdOutlineFileDownload,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="md:w-2/3 md:mx-auto flex flex-col justify-center items-center p-4 gap-5 md:gap-8 mt-10">
      <h3 className="text-4xl md:text-5xl font-bold text-white text-center">
        Crie e gerencie cardápios online de forma simples e profissional.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5">
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
        <button className="text-base md:text-lg p-4 rounded-md font-extrabold uppercase bg-orange-500 text-white">
          CRIAR MEU CARDÁPIO
        </button>
      </Link>
    </div>
  );
}
