export {};

declare global {
  interface Window {
    electronAPI: {
      navigate: (callback: (route: string) => void) => void;
    };
  }
}
