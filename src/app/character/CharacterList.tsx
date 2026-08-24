"use client";

import { useState } from "react";
import Link from "next/link";

type Karakter = {
  id: number;
  name: string;
};

type CharacterListProps = {
  karakters: Karakter[];
};

export default function CharacterList({ karakters }: CharacterListProps) {
  const [query, setQuery] = useState("");

  const filterKarakters = karakters.filter((karakter) =>
    karakter.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Daftar Karakter
        </h1>

        <input
          type="text"
          placeholder="Cari karakter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />

        <p className="mb-4 text-sm text-gray-500">
          Ditemukan {filterKarakters.length} karakter
        </p>

        <ul className="space-y-3">
          {filterKarakters.map((karakter) => (
            <li key={karakter.id}>
              <Link
                href={`/character/${karakter.id}`}
                className="block rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-green-500 hover:bg-green-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    {karakter.name}
                  </span>
                  <span className="text-sm text-green-600">
                    Detail →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filterKarakters.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Karakter tidak ditemukan.
          </div>
        )}
      </div>
    </main>
  );
}