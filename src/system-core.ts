import { MessageService } from './application/services/message.service'
import { ITransportPort } from './domain/repositories'
import { ChunkMessageProcessor } from './domain/services'
import { Emitter } from './infrastructure/events/emitter'
import { IEmitterPort } from './infrastructure/events/emitter.port'
import { TransportFactory } from './infrastructure/transport'

/**
 * SystemCore - singleton entrypoint cho React app
 *
 * - tự detect transport (TransportFactory.create())
 * - wrap MessageService (send/on/off)
 * - đảm bảo transport async-ready trước khi gửi/listen
 */
export class SystemCore {
  private static instance: SystemCore | null = null
  private transport: ITransportPort
  private emitter: IEmitterPort
  private chunkMessageProcessor: ChunkMessageProcessor

  messageService: MessageService
  constructor() {
    this.transport = TransportFactory.create()
    this.emitter = new Emitter()
    this.chunkMessageProcessor = new ChunkMessageProcessor()
    this.messageService = new MessageService(this.transport, this.emitter, this.chunkMessageProcessor)
  }
  /** Lấy instance singleton */
  public static getInstance(): SystemCore {
    if (!SystemCore.instance) {
      SystemCore.instance = new SystemCore()
    }
    return SystemCore.instance
  }
}

export const systemCore = SystemCore.getInstance()
