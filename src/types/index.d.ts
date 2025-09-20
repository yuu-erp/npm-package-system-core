export type Id = string | number

/**
 * Message bao ngoài (raw transport message)
 */
export type TransportMessage = NormalMessage | LargeMessage

export interface TargetMessage {
  /**
   * Đích đến để postMessage
   * - Ví dụ: "window", "iframe:chat", "worker:audio"
   * - Có thể null nếu broadcast toàn app
   */
  target?: string | null
}

export interface NormalMessage extends TargetMessage {
  type: 'normal'
  data: string // JSON.stringify(MessageEntity)
}

export interface LargeMessage extends TargetMessage {
  type: 'large'
  chunk: string
  index: number
  totalChunks: number
  command: string
}
