import { TransportMessage } from '../entities'
import { Command, Response } from '../types'

export interface ITransportPort {
  send<T extends Command>(payload: TransportMessage): Promise<Response<T>>
  onMessage(callback: (event: MessageEvent) => void): void
}
