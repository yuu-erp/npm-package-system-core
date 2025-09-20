import type { ITransportPort } from '~/domain'
import { InternalServerErrorException } from '~/exceptions/exceptions'
import type { TransportMessage } from '~/types'
import type { ElectronAPI } from '~/types/env'

const CHANNELS = {
  TO_NATIVE: 'native',
  FROM_NATIVE: 'fromNative'
} as const

export class ElectronAPITransport implements ITransportPort {
  private readonly electronAPI: ElectronAPI | undefined
  constructor() {
    this.electronAPI = this.getElectronAPI()
  }

  public async send(payload: TransportMessage): Promise<void> {
    if (!this.electronAPI)
      throw new InternalServerErrorException('Electron API is not available or not properly initialized')
    this.electronAPI.sendMessage(CHANNELS.TO_NATIVE, payload)
  }

  public onMessage(callback: (event: TransportMessage) => void): void {
    if (!this.electronAPI) {
      console.warn('Electron API is not available, message listener not registered')
      return
    }
    this.electronAPI.onMessage(CHANNELS.FROM_NATIVE, (event: MessageEvent) => {
      const message = this.normalizeMessage(event.data)
      if (message) {
        callback(message)
      }
    })
  }

  private getElectronAPI(): ElectronAPI | undefined {
    if (
      typeof window === 'undefined' ||
      typeof window.electronAPI === 'undefined' ||
      typeof window.electronAPI.sendMessage !== 'function' ||
      typeof window.electronAPI.onMessage !== 'function'
    ) {
      return undefined
    }
    return window.electronAPI
  }

  private normalizeMessage(data: unknown): TransportMessage | null {
    if (data && typeof data === 'object' && 'type' in data && 'data' in data) {
      return data as TransportMessage
    }
    console.warn('Invalid message format received:', data)
    return null
  }
}
