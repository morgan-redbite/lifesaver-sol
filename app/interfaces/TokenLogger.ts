interface LinkedAddress {
  ownerAddress: string;
  holdAmount: number;
  percentage: number;
}

interface Botter {
  ownerAddress: string;
  holdAmount: number;
  percentage: number;
  linkedAaddress: LinkedAddress;
}

interface Payload {
  tokenAddress: string;
  ticker: string;
  description: string;
  image: string;
  social: Record<string, unknown>;
  isPumpfunToken: boolean;
  amountOfTimeCompletingBondingCurve: number;
  isTryingToFakePumpFun: boolean;
  isPumpFunBundled: string;
  isImmediateBondingCurveCompleted: boolean;
  isHolderBotted: boolean;
  botters: Botter[];
  tokenIsBundler: boolean;
  bundlerPlatform: string;
  lpLockedPercentage: number;
  risk: string;
  tokenFreeAuthority: string;
  tokenIsMintAuthority: string;
}

interface Message {
  targetTag: string;
  payload: Payload;
}

interface WebSocketMessage {
  from: string;
  message: Message;
}

export type { WebSocketMessage, Message, Payload, Botter, LinkedAddress };