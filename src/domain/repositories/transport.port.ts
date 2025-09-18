import { CommandMessage } from '~/types/command'
import { MessageEntityProps } from '../message.entity'

export interface ITransportPort {
  send<T extends CommandMessage>(payload: MessageEntityProps<T>): Promise<void>
}
