export function getBaseUrl() {
    // Client-side - relatywny URL
    if (typeof window !== 'undefined') {
      return '';
    }
    
    // Server-side na Vercel
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    
    // Local development
    return 'http://localhost:3000';
  }