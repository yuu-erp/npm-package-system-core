import { TransportMessage } from '~/domain/entities'
import { ITransportPort } from '~/domain/repositories'
import { Command, Response } from '~/domain/types'

export class PostMessageTransport implements ITransportPort {
  async send<T extends Command>(payload: TransportMessage): Promise<Response<T>> {
    console.log('[PostMessageTransport] - SEND :', payload)
    throw new Error('Method not implemented.')
  }

  onMessage(callback: (event: MessageEvent) => void): void {
    window.addEventListener('message', callback)
  }
}
