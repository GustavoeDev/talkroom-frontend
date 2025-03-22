import Image from "next/image";

export default function FormUpdateUser() {
  return (
    <form className="my-3 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 relative">
          <Image
            src="https://avatars.githubusercontent.com/u/177130380?v=4"
            alt="avatar"
            width={1280}
            height={720}
            className="object-cover w-full h-full"
          />
        </div>
        <input
          className="border py-1 px-4 rounded-md text-sm w-full border-zinc-400"
          type="file"
          id="avatar"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nameUser">Nome</label>
        <input
          type="text"
          id="nameUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="Nome"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="emailUser">E-mail</label>
        <input
          type="text"
          id="emailUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="E-mail"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="passwordUser">Senha</label>
        <input
          type="text"
          id="passwordUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="Senha"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPasswordUser">Confirmar senha</label>
        <input
          type="text"
          id="confirmPasswordUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="Confirmar senha"
        />
      </div>

      <button
        type="submit"
        className="bg-emerald-700 py-3 font-medium text-white rounded-md border-0 hover:bg-emerald-800 transition-colors cursor-pointer mt-3"
      >
        Confirmar alterações
      </button>
    </form>
  );
}
