declare global {
  interface Window {
    electron?: {
      onNavigate: (callback: (path: string) => void) => void;
    };
  }
}

export {};
