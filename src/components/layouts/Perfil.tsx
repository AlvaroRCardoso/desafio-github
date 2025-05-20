import { useState } from "react";
import Image from "next/image";
import { GoChevronDown, GoLink, GoLocation, GoOrganization } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";

export default function Perfil() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="relative w-[100px] h-[100px]">
        <Image
          src="/vercel.svg"
          alt="Imagem de Perfil"
          width={100}
          height={100}
          className="rounded-full bg-zinc-950 min-h-[100px]"
        />
        <div className="bg-background w-7 h-7 rounded-full text-[12px] flex justify-center items-center absolute right-0 bottom-0">
          😎
        </div>
      </div>
      <div className="text-center max-w-57">
        <h1 className="text-lg text-preto font-bold">Gabriel Cordeiro</h1>
        <h2 className="text-cinza text-xs font-normal">Head development team Front-End Magazord - Tagged (#BZ)</h2>
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        <button
            onClick={toggleAdditionalInfo}
            className="text-link flex flex-col items-center"
          >
            <p className="text-xs font-normal">Informações Adicionais</p>
            <div className={`transition-transform duration-300 ${showAdditionalInfo ? 'rotate-180' : ''}`}>
              <GoChevronDown className="w-6 h-6" />
            </div>
          </button>

          <div 
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
              showAdditionalInfo 
                ? 'max-h-60 opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-4'
            }`}
          >
            <ul className="flex flex-col gap-2.5 p-4 rounded-2xl bg-background-cinza text-link">
              <li className="flex items-center gap-2">
                <GoOrganization />
                <span className="text-xs">Magazord - plataforma</span>
              </li>
              <li className="flex items-center gap-2">
                <GoLocation />
                <span className="text-xs">Rio do Sul - SC</span>
              </li>
              <li className="flex items-center gap-2">
                <GoLink />
                <span className="text-xs">Cordas hub uok</span>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram />
                <span className="text-xs">Gabriel.s.cordeiro</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
}