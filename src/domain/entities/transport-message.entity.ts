/**
 * Message bao ngoài (raw transport message)
 */
export type TransportMessage = NormalMessage | LargeMessage

export interface NormalMessage {
  type: 'normal'
  data: string // JSON.stringify(MessageEntity)
}

export interface LargeMessage {
  type: 'large'
  chunk: string
  index: number
  totalChunks: number
  command: string
}
