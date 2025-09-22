import { MessageService } from './application'
import { ChunkMessageProcessor, ITransportPort } from './domain'
import { Emitter, TransportFactory, type IEmitterPort } from './infrastructure'

/**
 * SystemCore - singleton entrypoint cho React app
 *
 * - tự detect transport (TransportFactory.create())
 * - wrap MessageService (send/on/off)
 * - đảm bảo transport async-ready trước khi gửi/listen
 */
export class SystemCore {
  private static instance: SystemCore | null = null
  private readonly transport: ITransportPort
  private readonly emitter: IEmitterPort
  private readonly chunkMessageProcessor: ChunkMessageProcessor

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
