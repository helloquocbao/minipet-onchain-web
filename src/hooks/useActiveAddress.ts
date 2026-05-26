import { useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';

export function useActiveAddress() {
  const account = useCurrentAccount();
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);

  useEffect(() => {
    // Read from localStorage on mount and when storage changes (if in same window, we might need custom event, but usually mount is enough)
    const checkZkLogin = () => {
      setZkLoginAddress(localStorage.getItem('zklogin_address'));
    };
    
    checkZkLogin();
    
    window.addEventListener('storage', checkZkLogin);
    return () => window.removeEventListener('storage', checkZkLogin);
  }, []);

  return account?.address || zkLoginAddress;
}
