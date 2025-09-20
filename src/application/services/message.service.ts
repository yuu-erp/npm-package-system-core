import { MessageEntity, TransportMessage } from '~/domain/entities'
import { ITransportPort } from '~/domain/repositories'
import { ChunkMessageProcessor } from '~/domain/services'
import { Command, Response } from '~/domain/types'
import { IEmitterPort } from '~/infrastructure/events/emitter.port'

export class MessageService {
  private pendingCommand = new Map<string, (data: unknown) => void>()

  constructor(
    private readonly transport: ITransportPort,
    private readonly emitter: IEmitterPort,
    private readonly chunkMessageProcessor: ChunkMessageProcessor
  ) {
    this.transport.onMessage(this.handleMessage.bind(this))
  }

  public on<T extends Command>(command: T, callback: (data: Response<T>) => Promise<void>): void {
    this.emitter.on(command, callback)
  }

  public removeEventListener<T extends Command>(command: T, callback: (data: Response<T>) => Promise<void>): void {
    this.emitter.off(command, callback)
  }

  public removeAllEventListeners(): void {
    this.emitter.all?.()
  }

  /**
   * Gửi request tới native/backend
   */
  public async send<T extends Command>(payload: MessageEntity<T>): Promise<Response<T>> {
    return new Promise<Response<T>>((resolve, reject) => {
      const messageId = payload.messageId || crypto.randomUUID()
      payload.messageId = messageId
      // set thêm appId, windowId nếu có
      const appId = this.getAppId()
      if (appId) {
        payload.appId = appId
      }
      const windowId = this.getWindowId()
      if (windowId) {
        payload.windowId = windowId
      }

      const commandID = `${payload.command}_${payload.messageId}`

      // Lưu callback resolve để khi có response thì xử lý
      this.pendingCommand.set(commandID, (data) => {
        resolve(data as Response<T>)
        this.pendingCommand.delete(commandID)
      })
      console.log('[MessageService] - PAYLOAD :', payload)
      try {
        const serialized = JSON.stringify(payload)

        // Nếu message quá lớn → chia chunk
        if (serialized.length > 24_000) {
          const chunks = this.chunkMessageProcessor.split(serialized, payload.command)
          chunks.forEach((chunkMsg) => {
            this.transport.send<T>(chunkMsg).catch(reject)
          })
        } else {
          const normalMessage: TransportMessage = {
            type: 'normal',
            data: serialized
          }
          this.transport.send<T>(normalMessage).catch(reject)
        }
      } catch (err) {
        this.pendingCommand.delete(commandID)
        reject(err)
      }
    })
  }

  private handleMessage(event: MessageEvent) {
    console.log(event)
  }

  private getAppId() {
    if (!window.electronAPI) return window.appId
    return window.electronAPI.windowId ?? window.appId
  }

  private getWindowId() {
    const searchParams = new URLSearchParams(window.location.search)
    const hash = window.location.hash
    if (searchParams.has('windowId')) {
      return searchParams.get('windowId')
    }
    if (hash.includes('?')) {
      const hashQuery = hash.split('?')[1]
      const hashParams = new URLSearchParams(hashQuery)
      if (hashParams.has('windowId')) {
        return hashParams.get('windowId')
      }
    }
    return null
  }
}
