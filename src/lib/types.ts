export interface TransactionType {
  blockNum?: string;
  uniqueId?: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  erc721TokenId?: string | null;
  erc1155Metadata?: string | null;
  tokenId?: string | null;
  asset?: string;
  category?: string;
  rawContract?: {
    value: string;
    address: string;
    decimal: string;
  };
  metadata: {
    blockTimestamp: string;
  };
  isNew?: boolean;
}
