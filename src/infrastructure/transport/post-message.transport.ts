import { TransportMessage } from '~/domain/entities'
import { ITransportPort } from '~/domain/repositories'
import { Command, Response } from '~/domain/types'

export class PostMessageTransport implements ITransportPort {
  send<T extends Command>(payload: TransportMessage): Promise<Response<T>> {
    throw new Error('Method not implemented.')
  }
  on<T extends Command>(command: T, callback: (data: Response<T>) => Promise<void>): void {
    throw new Error('Method not implemented.')
  }

  onMessage(callback: (event: MessageEvent) => void): void {
    window.addEventListener('message', callback)
  }
}
