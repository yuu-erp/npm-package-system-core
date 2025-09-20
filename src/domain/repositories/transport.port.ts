import { TransportMessage } from '../entities'
import { Command, Response } from '../types'

export interface ITransportPort {
  send<T extends Command>(payload: TransportMessage): Promise<Response<T>>
  on<T extends Command>(command: T, callback: (data: Response<T>) => Promise<void>): void
  onMessage(callback: (event: MessageEvent) => void): void
}
