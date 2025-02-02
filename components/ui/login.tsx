"use client";

import { useSession, signOut } from "next-auth/react";
import LoginGoogleButton from "./login-google-button";
export default function Login() {
  const { data: session } = useSession();
  return !session ? (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 sm:px-20 font-[family-name:var(--font-geist-sans)] z-20">
      <p className="text-center text-neutral-500 text-sm">
        Para utilizar Color Crafter inicia sesión con Google
      </p>

      <div className="flex items-center justify-center gap-4">
        <LoginGoogleButton />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <p className="text-center text-neutral-500">
        Iniciaste sesión como {session?.user?.name}.
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="font-medium text-gray-700">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
