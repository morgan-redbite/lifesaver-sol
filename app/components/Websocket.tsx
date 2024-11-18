/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Message, Payload, WebSocketMessage } from "../interfaces/TokenLogger";
import "./styles.css";
import { Modal } from "./Modal";
import { formatDistanceToNow  } from 'date-fns';

function getRelativeTime(updatedAt: Date) {
  if (!updatedAt) return "Few seconds ago";
  return formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
}

const WebsocketPage = () => {
  const [messages, setMessages] = useState<Payload[]>([]);
  const [status, setStatus] = useState("Disconnected");
  
  useEffect(() => {
    const ws = new WebSocket("wss://websocket-master-lifesaver-sol-production-195e.up.railway.app"); // Replace with your WebSocket URL

    ws.onopen = () => {
      console.log("WebSocket connected");
      setStatus("Connected");

      // Example: Send a message to the WebSocket server
      ws.send(JSON.stringify({tag: "FROM_FRONTEND"}));
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      const dataParsed = JSON.parse(event.data) as Message;
      const { targetTag, payload } = dataParsed;
      const dataMessage = payload;
      setMessages((prev) => [dataMessage, ...prev]); // Store received messages
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setStatus("Disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("Error");
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // console.log(messages);
  const onGetInitialUnloadedData = async () => {
    try {
      const initialResult = await fetch("https://websocket-master-lifesaver-sol-production-195e.up.railway.app/tokens?limit=50");
      const initialData = await initialResult.json();
      setMessages(initialData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }

  useEffect(() => {
    onGetInitialUnloadedData();
    return () => {};
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // on click outside of modal, close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isModalOpen && event.target instanceof HTMLElement) {
        console.log('event.target', event.target.id);
        if (event.target.id.includes("modal")) {
          setIsModalOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  const [indexModalView, setIndexModalView] = useState<Payload | null>(null);
  return (
    <>
      <div className="area_style" id='area_style'>
        <h1>WebSocket Status: {status}</h1>
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-center">To save your life</div>
          <div className="w-full flex justify-center">We are here to help you</div>
          <div className="w-full flex flex-col justify-center items-center">
            <span>Botted/Insiders - The token have been bought with suspicious amount</span>
            <span>Fast Bonding Curve Migration - This is a way how scammers lure snipers by injecting large bot to buy at immediate.</span>
          </div>
        </div>
        <div className="flex flex-col scrollable_div gap-2">
          {messages.map((m, index) => (
            <div key={index} className="flex flex-col w-full gap-3 card_style">
              <div className="flex flex-row w-full gap-5 items-center">
                <img className="rounded-full" src={m.image} alt={m.ticker} width={32} height={32} />
                <span className="font-bold w-[90%]">{m.ticker}</span>
                <CopyToken tokenAddress={m.tokenAddress} />
              </div>
              <div>
                <span>{m.description}</span>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-semibold">Verify</span>
                <span>Platform: {ConvertPlatformTypeRisk(m.bundlerPlatform)}</span>
                {m.isPumpfunToken ?
                  <>
                    <span>PumpFun Creation: {ConvertIsPumpFunBundled(m.isPumpFunBundled)}</span>
                    <span>Botted/Insiders: {m.isHolderBotted ? <span className="text-red-500">YES ❌</span> : <span className="text-green-500">NO ✅</span>} 
                      {m.isHolderBotted && (
                        <>- 
                          <span onClick={() => {
                            setIsModalOpen(true)
                            setIndexModalView(m)
                          }} className="cursor-pointer">{' '}VIEW</span>
                        </>
                      )}
                    </span>
                    <span>Fast Bonding Curve Migration: {m.isImmediateBondingCurveCompleted ? 'YES': 'NO'} - Time Completion: {m.amountOfTimeCompletingBondingCurve || 0}</span>
                  </>
                  :
                  <>
                    <span>Botted/Insiders: {m.isHolderBotted ? <span className="text-red-500">YES ❌</span> : <span className="text-green-500">NO ✅</span>} 
                      {m.isHolderBotted && (
                        <>-
                          <span onClick={() => {
                            setIsModalOpen(true)
                            setIndexModalView(m)
                          }} className="cursor-pointer">{' '}VIEW</span>
                        </>
                      )}
                    </span>
                  </>
                }
                <div className="flex flex-col">
                  <span className="text-gray-300">Freeze Authority: <span>{FreezeOrMintAuthority(m.tokenFreeAuthority)}</span></span>
                  <span className="text-gray-300">Mint Authority: <span>{FreezeOrMintAuthority(m.tokenIsMintAuthority)}</span></span>
                </div>
              </div>
              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "rgb(250 250 250 / 0.2)",
                  margin: "0px 0px 0px 0px",
                }}
              ></div>
              <div>Last Created - {getRelativeTime(m.updatedAt)}</div>
              {isModalOpen && indexModalView && <Modal payload={indexModalView}/>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const FreezeOrMintAuthority = (authority: string) => {
  switch (authority) {
    case "NULL":
      return <span className="text-green-300">DISABLED</span>;
    default:
      return <span className="text-red-300">THREAT</span>;
  }
}

const ConvertPlatformTypeRisk = (platform: string) => {
  switch (platform) {
    case "https://pump.fun":
      return <span className="text-green-300">{platform}</span>;
    case "https://www.dexlab.space":
      return <span className="text-red-400">{platform} - This is a Bundler Tools!</span>;
    case "https://slerf.tools":
      return <span className="text-red-400">{platform} - This is a Bundler Tools!</span>;
    case "https://tools.smithii.io/token-creator/solana":
      return <span className="text-red-400">{platform} - This is a Bundler Tools!</span>;
    default:
      return <span className="text-yellow-400">UNKNOWN - Proceed with caution!</span>;
  }
}

const ConvertIsPumpFunBundled = (isPumpFunBundled: string) => {
  switch (isPumpFunBundled) {
    case "PROPER_PUMP_FUN_TOKEN":
      return <span className="text-green-300">PumpFun Creation is Proper</span>;
    case "BUNDLED_SWAP_PUMP_FUN_CREATION":
      return <span className="text-yellow-400">PumpFun Creation is Bundled with Bots - Transaction was bundled by external creator</span>;
    case "FAKE_PUMP_FUN":
      return <span className="text-red-300">Fake PumpFun! - Created ends with "...pump" without using the platform</span>;
    default:
      return "UNKNOWN";
  }
};
const CopyToken = ({ tokenAddress }: { tokenAddress: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  const shortenInBetweenWithDotDotDot = (tokenAddress: string) => {
    const start = tokenAddress.slice(0, 6);
    const end = tokenAddress.slice(-6);
    return `${start}...${end}`;
  }
  return (
    <span className="text-[#8694EF] cursor-pointer w-[10%]"
      onClick={() => {
        navigator.clipboard.writeText(tokenAddress);
        setIsCopied(true);
      }}
    >
      {isCopied ? "Copied!" : `${shortenInBetweenWithDotDotDot(tokenAddress)}`}
    </span>
  )
}

export default WebsocketPage;