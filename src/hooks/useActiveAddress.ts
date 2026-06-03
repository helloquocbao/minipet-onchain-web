import { useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';

export function useActiveAddress() {
  const account = useCurrentAccount();
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);

  useEffect(() => {
    // Read from sessionStorage on mount
    const checkZkLogin = () => {
      setZkLoginAddress(sessionStorage.getItem('zklogin_address'));
    };
    
    checkZkLogin();
  }, []);

  return account?.address || zkLoginAddress;
}
