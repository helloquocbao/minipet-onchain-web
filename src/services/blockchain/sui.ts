import { getJsonRpcFullnodeUrl as getFullnodeUrl, SuiJsonRpcClient as SuiClient } from '@mysten/sui/jsonRpc';

export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x335f115a0189a9ec083080e1aff68d88b740b362f5499e8aa9d706a0ca14f877';
export const PET_TOKEN_PACKAGE_ID = process.env.NEXT_PUBLIC_PET_TOKEN_PACKAGE_ID || '0x46af6cc67f8a40f6a4a5267087176e6e4341e51df6e9decabfe07cf606186e23';
export const TREASURY_CAP_ID = process.env.NEXT_PUBLIC_TREASURY_CAP_ID || '0xee70cb5c91f06d64d2e136378008550b47fa29dc6057ed9538e97641bbdbe629';
export const GLOBAL_CONFIG_ID = process.env.NEXT_PUBLIC_GLOBAL_CONFIG_ID || '0xe3a081bf02478822daa3b8e957f2b6c10bacdf7c33ebd2b1db6e4f272e329886';
export const ADMIN_CAP_ID = process.env.NEXT_PUBLIC_ADMIN_CAP_ID || '0x24ed356d9227ec6d8fdefdbd46f8aa4b7dad951c7e499be290028a3e38baea36';
export const PET_TOKEN_TYPE = `${PET_TOKEN_PACKAGE_ID}::pet_token::PET_TOKEN`;

const network = (process.env.NEXT_PUBLIC_SUI_NETWORK as 'testnet' | 'mainnet' | 'devnet') || 'testnet';
export const suiClient = new SuiClient({ url: getFullnodeUrl(network), network });

export const MODULES = {
  PET_NFT: 'pet_nft',
};

export const FUNCTIONS = {
  BUY_MINT_SLOT: 'buy_mint_slot',
  MINT_CUSTOM: 'mint_custom_with_slot',
  BUY_PET: 'buy_pet',
  CREATE_TEMPLATE: 'create_template',
  UPDATE_CONFIG: 'update_config',
  INCREASE_LIMIT: 'increase_mint_limit',
};
