"use client";
import AddButton from "@/components/addButton";
import CardList from "@/components/CardList";
import Header from "@/components/Header";
import { useUserType } from "@/hooks/useUserType";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState('');
  const userType = useUserType();

  return (
    <main className="flex flex-col min-h-screen w-full p-4 sm:p-6 md:p-8 lg:p-12 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-12">
        <Header search={search} setSearch={setSearch} />
        <div className="flex-grow">
          <CardList search={search} />
        </div>
        {(userType === "Professor" || userType === "Administrador") && (
          <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8">
            <AddButton />
          </div>
        )}
      </div>
    </main>
  );
}