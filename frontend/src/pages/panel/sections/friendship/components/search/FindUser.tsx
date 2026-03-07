import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";

import { useDebounce } from "../../../../../../hooks/useDebounce";
import { useFindUser } from "../../../../../../hooks/useFindUser";
import InputContainer from "../../../../components/inputs/InputContainer";
import TextInput from "../../../../components/inputs/TextInput";
import {
  findUserSchemaData,
  FindUserSchemaType,
} from "../../../../schemas/findUserSchema";
import FindUserResult from "./FindUserResult";

export default function FindUser() {
  const { watch, register } = useForm<FindUserSchemaType>({
    resolver: zodResolver(findUserSchemaData),
  });

  const username = watch("username");
  const debouncedUsername = useDebounce(username);

  const { data: user } = useFindUser(debouncedUsername);

  return (
    <div className="flex flex-col gap-2">
      <InputContainer>
        <TextInput
          register={register("username")}
          placeholder="Buscar por username"
        />
      </InputContainer>

      {debouncedUsername &&
        (user ? <FindUserResult user={user} /> : <UserNotFound />)}
    </div>
  );
}

function UserNotFound() {
  return (
    <div className="m-1 flex flex-col items-center justify-center gap-1 text-secondary-text">
      <MdSearch className="h-6 w-6" />
      <span className="text-sm font-bold">Usuário não encontrado</span>
    </div>
  );
}
