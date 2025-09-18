import { MessageEntityProps } from '~/domain'
import { CommandMessage, CommandResponseMap } from '~/types/command'

export abstract class MessageTransportBase {
  private pending = new Map<string, (data: unknown) => void>()

  protected abstract sendMessage<T extends CommandMessage>(
    payload: MessageEntityProps<T>
  ): Promise<CommandResponseMap[T]>
}
