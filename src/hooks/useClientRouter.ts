import { useRouter as useNextRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useClientRouter() {
  const [isClient, setIsClient] = useState(false);
  const router = useNextRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return {
      push: () => {},
      // Adicione outros métodos do router que você usa, retornando funções vazias
    };
  }

  return router;
}