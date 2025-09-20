import { Command, Request } from '../types'

export interface MessageEntity<T extends Command = Command> {
  messageId?: string
  command: T
  value?: Request<T>
  windowId?: string
  appId?: string
}
