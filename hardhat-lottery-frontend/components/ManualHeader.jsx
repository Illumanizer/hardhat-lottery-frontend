import Moralis from "moralis-v1";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const ManualHeader = () => {
  const { enableWeb3, account, isWeb3Enabled, deactivateWeb3,isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, []);

  useEffect(() => { 
    Moralis.onAccountChanged(async (account) => {
        console.log('account changed', account);
        
        if(account==null){
            window.localStorage.removeItem("connected");
            deactivateWeb3();
            console.log("Null account found");
        }
    });
  },[]);
  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}.......
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ManualHeader;
