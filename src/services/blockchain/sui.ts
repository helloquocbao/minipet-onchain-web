import { getJsonRpcFullnodeUrl as getFullnodeUrl, SuiJsonRpcClient as SuiClient } from '@mysten/sui/jsonRpc';

export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x7b791a2ad03b3b07bc7edfcda2d29b49cf05321fa67f695381fa4d9f3dd85506';
export const PET_TOKEN_PACKAGE_ID = process.env.NEXT_PUBLIC_PET_TOKEN_PACKAGE_ID || '0x34564fd6bf0afdd7cbd6d2f2943de413df645ffa703417948638ea1d10c710d8';
export const TREASURY_CAP_ID = process.env.NEXT_PUBLIC_TREASURY_CAP_ID || '0xee70cb5c91f06d64d2e136378008550b47fa29dc6057ed9538e97641bbdbe629';
export const GLOBAL_CONFIG_ID = process.env.NEXT_PUBLIC_GLOBAL_CONFIG_ID || '0x1894950505bcdf8473f7c143b28cc17816c0317b0416d00aff5034ac2f169314';
export const ADMIN_CAP_ID = process.env.NEXT_PUBLIC_ADMIN_CAP_ID || '0x5d37341aefbbbc2af9b75c2f859fb04562c1899beafa711be0a865d379e71dc1';
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
