import { abi, contractAddress } from "@/constants";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const LotteryAddress = contractAddress[chainId] || null;
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("N/A");

  const dispatch = useNotification();

  const { runContractFunction: enterLottery , isLoading,isFetching} = useWeb3Contract({
    abi: abi,
    contractAddress: LotteryAddress,
    functionName: "enterLottery",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: LotteryAddress,
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: getNumOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: LotteryAddress,
    functionName: "getNumOfPlayers",
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: LotteryAddress,
    functionName: "getRecentWinner",
    params: {},
  });
  async function updateUI() {
    const entranceFeeFromCall = await getEntranceFee();
    const numPlayersFromCall = await getNumOfPlayers();
    const recentWinnerFromCall = await getRecentWinner();

    setEntranceFee(entranceFeeFromCall.toString());
    setNumPlayers(numPlayersFromCall.toString());
    setRecentWinner(recentWinnerFromCall.toString());
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };
  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction complete!",
      title: "Transaction notification",
      position: "topR",
    });
  };
  return (
    <div>
      {LotteryAddress ? (
        <div className="p-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={async () =>
              await enterLottery({
                onError: (error) => console.log(error),
                onSuccess: handleSuccess,
              })
            }
            disabled={isLoading || isFetching}
          >
           {isLoading || isFetching ? <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div> : "Enter Lottery"}
          </button>
          <div>
            <ul>
              <li>
                Entrance Fee: {ethers.utils.formatEther(entranceFee, "ether")}{" "}
                Eth
              </li>
              <li>Players: {numPlayers}</li>
              <li>Recent Winner: {recentWinner}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-5">No Lottery Address Detected !!</div>
      )}
    </div>
  );
};

export default LotteryEntrance;
