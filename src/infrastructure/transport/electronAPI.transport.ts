import { TransportMessage } from '~/domain/entities'
import { ITransportPort } from '~/domain/repositories'
import { Command, Response } from '~/domain/types'

export class ElectronAPITransport implements ITransportPort {
  async send<T extends Command>(payload: TransportMessage): Promise<Response<T>> {
    console.log('[ElectronAPITransport] - SEND :', payload)
    throw new Error('Method not implemented.')
  }
  onMessage(callback: (event: MessageEvent) => void): void {
    if (
      typeof window !== 'undefined' &&
      typeof window.electronAPI !== 'undefined' &&
      typeof window.electronAPI.onMessage === 'function'
    ) {
      window.electronAPI?.onMessage('fromNative', callback)
    }
  }
}
