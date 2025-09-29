// src/components/SignOutButton.tsx
"use client";

import { signOut } from "@/app/actions";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
      >
        Logout
      </button>
    </form>
  );
}