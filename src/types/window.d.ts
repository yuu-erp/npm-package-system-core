export {}

declare global {
  interface Window {
    appId?: string
    electronAPI?: {
      sendMessage: (channel: string, payload: unknown) => Promise<unknown>
      onMessage?: (channel: string, callback: (payload: MessageEvent) => void) => void
      windowId?: string
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
