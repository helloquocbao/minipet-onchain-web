import { getJsonRpcFullnodeUrl as getFullnodeUrl, SuiJsonRpcClient as SuiClient } from '@mysten/sui/jsonRpc';

export const PACKAGE_ID = '0x8bf42dbb049c416868bec9237b1250af343e63b69837b25af2b0bf2ad0832040';
export const GLOBAL_CONFIG_ID = '0x72ea7684bf6b28aa1d8355f7fdd9688e567342d78a04ec3b19c239589e0b7101';
export const ADMIN_CAP_ID = '0x543cfd6438a34140165a63de06ae6e004f118bb2070212783514ffbe45d7ea03';
export const PET_TOKEN_TYPE = '0xf20998a7f30a94ead030ad6528899aafff4693900fb4b547f59882615a0c24a4::pet_token::PET_TOKEN';

export const suiClient = new SuiClient({ url: getFullnodeUrl('testnet'), network: 'testnet' });

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
