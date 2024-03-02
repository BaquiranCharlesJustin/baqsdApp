"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
 
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const importToken = async () => {
    const { ethereum } = window as any;
    const tokenAddress = "0x599CfB26D418E27828eb6bF22b68EC054372e489";
    const tokenSymbol = "buchi";
    const tokenDecimal = 18;

    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 bg-black h-screen container mx-auto py-12">
      <div className="p-6 text-cyan-100 border border-gold rounded-md flex flex-col">
        <h1 className="mt-10 text-3xl font-bold flex justify-center ">
          Psst patingin muna ng wallet mo Gar!
        </h1>
        <div className="mt-20 flex flex-col justify-center items-center">
          <button
            onClick={() => {
              connectWallet();
            }}
            className="p-3 bg-lime-300 text-black font-bold rounded-full"
          >
            {walletKey !== "" ? walletKey : "Konek ka muna sa wallet mo Gar"}
          </button>

          <button
            onClick={importToken}
            className="mt-20 p-3 bg-lime-300 text-black font-bold rounded-full"
          >
            <p>Lista mo na yang Token mo dito Gar!</p>
          </button>
        </div>
      </div>
      <div className="p-6 text-cyan-100 border border-gold rounded-md flex flex-col">
        <h1 className="mt-10 text-3xl font-bold flex justify-center ">
          Gawaan at Sugalan este Staking ng buchiCoin
        </h1>
        <div className="mt-16 flex flex-col justify-center items-center gap-3">
          <form>
            <p className="font-bold text-xl">Ilan buchiCoin ba kailangan mo Gar?</p>
          </form>
          <input
            className="font-bold text-black text-xl"
            type="number"
            value={mintingAmount}
            onChange={(e) => mintAmountChange(e)}
          />
          <button
            onClick={() => {
              mintCoin();
            }}
            className="p-3 bg-lime-300 text-black rounded-full font-bold "
          >
            Order mo na Gar!
          </button>

          <form>
          <p className="font-bold text-xl">Itaya mo na yan Gar para dumami!</p>
          </form>
          <input
            className="font-bold text-black text-xl"
            type="number"
            value={stakingAmount}
            onChange={(e) => stakeAmountChange(e)}
          />
          <button
            onClick={stakeCoin}
            className="p-3 bg-lime-300 text-black font-bold rounded-full"
          >
            Parang kulang pa Gar? Sige na nga pwede na yan
          </button>
        </div>
      </div>

      <div className="p-6 text-cyan-100 border border-gold rounded-md col-span-2">
        <h1 className="text-3xl font-bold flex justify-center">
          TALAGA PALDO SI GAR, WITHDRAW KANA GAR?
        </h1>
        <div className="mt-14 flex flex-col justify-center items-center gap-5">
          <button
            onClick={withdrawCoin}
            className="p-3 bg-lime-300 text-black rounded-full font-bold"
          >
            Withdraw mona Gar! Isang case agad yan
          </button>
          <p className="mt-5 font-bold text-xl">
            Sensya na gar log kasi dito, fb ka muna mga saglit pagtapos mo mag withdraw
          </p>
        </div>
      </div>
    </div>
  );
}
