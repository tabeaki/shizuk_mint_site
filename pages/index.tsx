import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from 'next/image'
import Seo from './components/Seo'
import Header from './components/Header';
import toast, { Toaster } from 'react-hot-toast'

declare global {
  interface Window {
    ethereum: any;
  }
}

const abi = [
  "function totalSupply() public view virtual override returns (uint256)",
  "function mint(uint256 _mintAmount) public payable ",
  "function is_paused() public view returns (bool)",
]
const contractAddress = "0x3951DC8dBEfA6A562122e1d031Bc7756672a6303"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {

  const [mintNum, setMintNum] = useState(0);
  const [paused, setpaused] = useState(false);
  const [getAccountFlag, setgetAccountFlag] = useState(false);

  useEffect(() => {
    const setSaleInfo = async() =>{
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)    
      const accounts =  await provider.send("eth_requestAccounts", []);
      if(accounts[0] !== undefined){
        await setgetAccountFlag(true);
      }
      const signer = provider.getSigner()
      const contract = await new ethers.Contract(contractAddress, abi, signer);
      try{
        const mintNumber = (await contract.totalSupply());
        console.log("mintNumber=" + mintNumber);
        console.log("mintNum=" + mintNum);
        const paused = await contract.is_paused();
        setMintNum(mintNumber);
        setpaused(paused);
      }catch(e){
        console.log(e)
      }
    }
    // add Network
    const addChain = async() => {
      try{
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: "0x5",
            chainName: 'Goerli',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 5,
            },
            rpcUrls: ['https://goerli.infura.io/v3/20cd5bade2c0407da65c6811cc2a1b37'],
          }],
        })
        console.log("try");
      }catch(Exeption){
        console.log("Ethereum already Connected");
        console.log("catch");
      }finally{
        console.log("finally");
      }
    }
    addChain();
    setSaleInfo();

  }, []);

  // ミントボタン用
  function MintButton() {

    const MetaMuskConnect = async () =>{
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const signer = provider.getSigner()
      const tokenPrice = "0";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try{
        await contract.mint(1,{value: ethers.utils.parseEther(tokenPrice),gasLimit: 100000});
        toast('Starting to execute a transaction')
      }catch(err: any) {
        // JSONへ変換
        let jsonData = JSON.stringify(err.reason);
        toast(jsonData);
      }

    };

    const ConnectWallet = async () =>{
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const accounts =  await provider.send("eth_requestAccounts", []);
      if(accounts[0] !== undefined){
        await setgetAccountFlag(true);
      }
    };
    
    return <>
    <div className="flex flex-wrap buttom justify-center bg-black bg-center bg-cover">
      <div className="m-28 px-2 py-20 lg:px-20 lg:py-4 border-double border-8 rounded-md bg-black text-center bg-center bg-contain bg-no-repeat">
        <h3 className="text-xs lg:text-4xl text-white font-semibold "></h3>
        <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">Please Change Goeril network</h1>
        <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold "></h1>
        <h1 className="text-base lg:text-5xl pt-1 pb-2 text-white font-semibold "> {mintNum} / 3000</h1>
        <h3 className="sm:text-lg lg:text-3xl pt-1 text-white font-semibold ">Price free</h3>  
        {/* ... */}
        {(!getAccountFlag) && <a href="#_" className="px-5 mt-4 mb-4 py-2.5 relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-slate-100 to-slate-500"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-slate-100 to-slate-500"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-slate-100 to-slate-100"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-slate-200 from-slate-500"></span>
        <span className="relative" onClick={ConnectWallet}>Connect Wallet</span>
        <Toaster /></a>}
        {(getAccountFlag && !paused && mintNum <= 3000) && <a href="#_" className="px-5 mt-4 mb-4 py-2.5 relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-slate-100 to-slate-500"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-slate-100 to-slate-500"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-slate-100 to-slate-100"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-slate-200 from-slate-500"></span>
        <span className="relative" onClick={MetaMuskConnect}>NFT Mint</span>
        <Toaster /></a>}
        
        { (!paused && mintNum >= 3000) && <h3 className="sm:text-lg lg:text-3xl pt-1 text-white font-semibold ">End of sale</h3>}
        <br/><a className="text-sm lg:text-2xl pt-1 text-white underline" href="https://testnets.opensea.io/ja/collection/shizuk-test" >market palace</a>
      </div>
      
    </div>
    </>
  }

  return (
    <>
      <div className="">
      <Header />
      <Seo
        pageTitle={'SJB_Hushimiinari'}
        pageDescription={'SJB_Hushimiinari'}
        pageImg={'https://sjb-hushimiinari.vercel.app/_next/image?url=%2Fmain_grap.png&w=3840&q=75'}
        pageImgWidth={1920}
        pageImgHeight={1005}
      />
      <Image className="min-w-full" src="/main_grap.png" alt="Main Image" width={1920} height={800}/>
      <MintButton />
    </div></>
  )
} 

export default Home
