import { abi, contractAddress } from "@/constants";
import { Tulpen_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

const LotteryEntrance = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const LotteryAddress = contractAddress[chainId] || null;
  const [entranceFee, setEntranceFee] = useState("0");
  //   const { runContractFunction: enterLottery } = useWeb3Contract({
  //     abi: abi,
  //     contractAddress: contractAddress[chainId][0] | null,
  //     functionName: "enterLottery",
  //     params: [],
  //     msgValue: 0,
  //   });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: LotteryAddress,
    functionName: "getEntranceFee",
    params: {},
  });
 async function updateUI() {
        const entranceFeeFromCall = await getEntranceFee();   
        const s=ethers.utils.formatUnits(entranceFeeFromCall,"ether");
        setEntranceFee(entranceFeeFromCall.toString());
        console.log(entranceFeeFromCall);
      }
  useEffect(() => {
    if (isWeb3Enabled) {
     
      updateUI();
    }
  }, [isWeb3Enabled]);
  return <div>{entranceFee}</div>;
};

export default LotteryEntrance;
