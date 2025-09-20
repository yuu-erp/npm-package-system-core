import { TransportMessage } from '~/types'

export interface ITransportPort {
  send(payload: TransportMessage): Promise<void>
  onMessage(callback: (event: TransportMessage) => void): void
}
