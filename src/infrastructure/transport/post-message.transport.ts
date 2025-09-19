import { MessageEntity } from '~/domain/entities'
import { ITransportPort } from '~/domain/repositories'
import { Command, Response } from '~/domain/types'

export class PostMessageTransport implements ITransportPort {
  send<T extends Command>(payload: MessageEntity<T>): Promise<Response<T>> {
    throw new Error('Method not implemented.')
  }

  on<T extends Command>(payload: MessageEntity<T>, callback: (data: Response<T>) => Promise<void>): void {
    throw new Error('Method not implemented.')
  }
}
