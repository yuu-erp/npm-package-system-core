import { ITransportPort } from '~/domain/repositories'
import { InternalServerErrorException } from '~/exceptions/exceptions'
import { TransportMessage } from '~/types'
import { Webkit } from '~/types/env'

export class WebkitTransport implements ITransportPort {
  private readonly webkit: Webkit | undefined
  constructor() {
    this.webkit = this.getWebkit()
  }
  private getWebkit(): Webkit | undefined {
    if (
      typeof window === 'undefined' ||
      typeof window.finsdk === 'undefined' ||
      typeof window.finsdk.call !== 'function'
    ) {
      return undefined
    }
    return window.webkit
  }

  async send(payload: TransportMessage): Promise<void> {
    if (!this.webkit) throw new InternalServerErrorException('Webkit is not available or not properly initialized')
    this.webkit.messageHandlers.callbackHandler.postMessage(payload)
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
