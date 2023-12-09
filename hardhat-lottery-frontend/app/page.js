"use client";

import Header from "@/components/Header";
import LotteryEntrance from "@/components/LotteryEntrance";
import ManualHeader from "@/components/ManualHeader";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

export default function Home() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <main>
          {/* <ManualHeader /> */}
          <Header />
          <LotteryEntrance />
        </main>
      </NotificationProvider>
    </MoralisProvider>
  );
}
