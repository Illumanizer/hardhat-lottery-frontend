import React from "react";
import { ConnectButton } from "web3uikit";

const Header = () => {
  return (
    <div className="p-5 border-b-2 flex grid-flow-row">
    <h1 className="py-4 px-4 font-bold text-3xl">Decentralized Lottery</h1>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
};

export default Header;
