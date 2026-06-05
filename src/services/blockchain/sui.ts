import { getJsonRpcFullnodeUrl as getFullnodeUrl, SuiJsonRpcClient as SuiClient } from '@mysten/sui/jsonRpc';

export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x24487e4dde2fe739343f4e2e6ea309c473e60dc4fd17f1cec6dfb76bd14dac7e';
export const PET_TOKEN_PACKAGE_ID = process.env.NEXT_PUBLIC_PET_TOKEN_PACKAGE_ID || '0x86d199f688b48c1af1bbead183e9bcb080d1cc9cd600161421a0b189b95bc588';
export const TREASURY_CAP_ID = process.env.NEXT_PUBLIC_TREASURY_CAP_ID || '0x24feeba4da2a36ff093d1050fa48b08f1ea25668b6d7401ff29970f99eb09937';
export const GLOBAL_CONFIG_ID = process.env.NEXT_PUBLIC_GLOBAL_CONFIG_ID || '0xf99cb5d4e97ba62b58070b71c321e666f543950a22c33e2eb96fb952c8c2a139';
export const ADMIN_CAP_ID = process.env.NEXT_PUBLIC_ADMIN_CAP_ID || '0x1e3aeef533bc5d7de52885da1d6fb95771a9275270e1521809609100383ec1ce';
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
