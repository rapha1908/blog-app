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
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header search={search} setSearch={setSearch} />
      <CardList search={search} />
      {(userType === "Professor" || userType === "Administrador") && <AddButton />}
    </main>
  );
}