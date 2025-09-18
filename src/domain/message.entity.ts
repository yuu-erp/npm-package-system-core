import { CommandMessage, CommandRequestMap, CommandResponseMap } from '~/types/command'

export interface MessageEntityProps<T extends CommandMessage = CommandMessage> {
  command: T
  value: CommandRequestMap[T]
}

export async function sendMessage<T extends CommandMessage>(
  payload: MessageEntityProps<T>
): Promise<CommandResponseMap[T]> {
  return new Promise((resolve) => {
    const messageId = crypto.randomUUID()

    postMessage({ ...payload, messageId }, '*')

    const handler = (event: MessageEvent) => {
      const data = event.data as { messageId: string; command: T; value: CommandResponseMap[T] }

      if (data.messageId === messageId) {
        window.removeEventListener('message', handler)
        resolve(data.value)
      }
    }

    window.addEventListener('message', handler)
  })
}

const { success } = await sendMessage({
  command: 'connectNode',
  value: {
    ip: '',
    port: ''
  }
})
