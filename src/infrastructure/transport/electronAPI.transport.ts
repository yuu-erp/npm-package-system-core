import { MessageEntityProps } from '~/domain'
import { ITransportPort } from '~/domain/repositories'
import { Command, Response } from '~/domain/types'

export class ElectronAPITransport implements ITransportPort {
  send<T extends Command>(payload: MessageEntityProps<T>): Promise<Response<T>> {
    throw new Error('Method not implemented.')
  }

  on<T extends Command>(payload: MessageEntityProps<T>, callback: (data: Response<T>) => Promise<void>): void {
    throw new Error('Method not implemented.')
  }
}
