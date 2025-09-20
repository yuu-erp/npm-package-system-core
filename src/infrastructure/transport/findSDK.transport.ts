import type { ITransportPort } from '~/domain'
import { InternalServerErrorException } from '~/exceptions/exceptions'
import type { TransportMessage } from '~/types'
import type { FindSDK } from '~/types/env'

export class FindSDKTransport implements ITransportPort {
  private readonly findSDK: FindSDK | undefined
  constructor() {
    this.findSDK = this.getFindSDK()
  }
  private getFindSDK(): FindSDK | undefined {
    if (
      typeof window === 'undefined' ||
      typeof window.finsdk === 'undefined' ||
      typeof window.finsdk.call !== 'function'
    ) {
      return undefined
    }
    return window.finsdk
  }
  async send(payload: TransportMessage): Promise<void> {
    if (!this.findSDK) throw new InternalServerErrorException('FINSDK is not available or not properly initialized')
    this.findSDK.call(payload)
  }

  onMessage(callback: (event: TransportMessage) => void): void {
    window.addEventListener('message', (event: MessageEvent) => {
      const message = this.normalizeMessage(event.data)
      if (message) {
        callback(message)
      }
    })
  }

  private normalizeMessage(data: unknown): TransportMessage | null {
    if (data && typeof data === 'object' && 'type' in data && 'data' in data) {
      return data as TransportMessage
    }
    console.warn('Invalid message format received:', data)
    return null
  }
}
