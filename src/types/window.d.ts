export {}

declare global {
  interface Window {
    electronAPI?: {
      sendMessage: (channel: string, payload: unknown) => Promise<unknown>
      onMessage?: (channel: string, callback: (payload: unknown) => void) => void
    }
    finsdk?: {
      call: () => Promise<unknown>
    }
    webkit?: {
      messageHandlers: {
        callbackHandler: {
          postMessage: (payload: unknown) => Promise<unknown>
        }
      }
    }
  }
}
