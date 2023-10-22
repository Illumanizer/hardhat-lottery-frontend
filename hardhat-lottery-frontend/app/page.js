"use client";

import Header from "@/components/Header";
import LotteryEntrance from "@/components/LotteryEntrance";
import ManualHeader from "@/components/ManualHeader";
import { MoralisProvider } from "react-moralis";

export default function Home() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <ManualHeader /> */}
        <Header/>
        <LotteryEntrance />
      </main>
    </MoralisProvider>
  );
}
