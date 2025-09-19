import { MessageEntityProps } from '../entities/message.entity'
import { Command, Response } from '../types'

export interface ITransportPort {
  send<T extends Command>(payload: MessageEntityProps<T>): Promise<Response<T>>
  on<T extends Command>(payload: MessageEntityProps<T>, callback: (data: Response<T>) => Promise<void>): void
}
