import { getJsonRpcFullnodeUrl as getFullnodeUrl, SuiJsonRpcClient as SuiClient } from '@mysten/sui/jsonRpc';

export const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID || '0xfc0ec477ca9f6173716b7e436924cd5e30a3274b888707a82706f4e6d86c12a3';
export const PET_TOKEN_PACKAGE_ID = import.meta.env.VITE_PET_TOKEN_PACKAGE_ID || '0xf20998a7f30a94ead030ad6528899aafff4693900fb4b547f59882615a0c24a4';
export const TREASURY_CAP_ID = import.meta.env.VITE_TREASURY_CAP_ID || '0x176bd212dde2662120bd13e22a71eafbb3d7e14d6c9042ec5497f82d97ae1bef';
export const GLOBAL_CONFIG_ID = import.meta.env.VITE_GLOBAL_CONFIG_ID || '0xffc5bb02aa137b5df823f9a241196866a827f352b80c8c5d88e757d6a3e667f8';
export const ADMIN_CAP_ID = import.meta.env.VITE_ADMIN_CAP_ID || '0xa014c6109b4ec82dc35adfb53fd17700ab93cd2e4547796d93dde22915e93d00';
export const PET_TOKEN_TYPE = `${PET_TOKEN_PACKAGE_ID}::pet_token::PET_TOKEN`;

const network = (import.meta.env.VITE_SUI_NETWORK as 'testnet' | 'mainnet' | 'devnet') || 'testnet';
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
