import { getJsonRpcFullnodeUrl as getFullnodeUrl, SuiJsonRpcClient as SuiClient } from '@mysten/sui/jsonRpc';

export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x1de01a3d4bf50fdc2710f765313469316efac4252a3192f835d71ff225578c03';
export const PET_TOKEN_PACKAGE_ID = process.env.NEXT_PUBLIC_PET_TOKEN_PACKAGE_ID || '0x7762d89a5c01c00ae0d118e3a2f6191ef13aa701a5aa7f57ecc38fe6959c403e';
export const TREASURY_CAP_ID = process.env.NEXT_PUBLIC_TREASURY_CAP_ID || '0x8c0387f8bf0654f9abef3690c5289226c06c15c3ea2d5a0a3451c891600bf31f';
export const GLOBAL_CONFIG_ID = process.env.NEXT_PUBLIC_GLOBAL_CONFIG_ID || '0xc77d430ff60cb762958bd36f7053d42a43bc6562fb21855b67fb8ff764dadf83';
export const ADMIN_CAP_ID = process.env.NEXT_PUBLIC_ADMIN_CAP_ID || '0x092031bc999896a437468675d8600288dfa48fd646444b07a769191236d9590d';
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
