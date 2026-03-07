import { FiSearch } from "react-icons/fi";

import SectionCard from "../../components/section/SectionCard";
import SectionCardTitle from "../../components/section/SectionCardTitle";
import SectionContainer from "../../components/section/SectionContainer";
import SectionTitle from "../../components/section/SectionTitle";
import FindUser from "./components/search/FindUser";

export default function Friendship() {
  return (
    <SectionContainer>
      <SectionTitle title="Amigos" />

      <SectionCard>
        <SectionCardTitle
          icon={<FiSearch className="h-4 w-4 text-primary-text" />}
          title="Buscar Usuário"
        />
        <FindUser />
      </SectionCard>
    </SectionContainer>
  );
}
