export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined; // Retorna undefined se estiver no lado do servidor
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}