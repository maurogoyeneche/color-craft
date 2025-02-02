"use client";

import { useSession, signOut } from "next-auth/react";
import LoginGoogleButton from "./login-google-button";
export default function Login() {
  const { data: session } = useSession();
  const user = session?.user ? session.user.name : null;
  return (
    session && (
      <div className="flex items-center w-full max-w-md gap-4 my-3 font-[family-name:var(--font-geist-sans)]">
        <span className="text-start text-neutral-500 w-full text-sm">
          Hola <strong>{user}</strong>.
        </span>

        <button
          onClick={() => signOut()}
          className="flex items-center text-xs px-2 py-1 border rounded-md hover:bg-gray-200 transition-colors"
        >
          Salir
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600 scale-75"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    )
  );
}
