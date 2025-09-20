import mitt, { Emitter as MittEmitter, EventType, Handler } from 'mitt'
import type { IEmitterPort } from './emitter.port'
/**
 * Emitter wrapper để quản lý event trong hệ thống
 * Có thể thay mitt bằng lib khác mà không ảnh hưởng core
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Emitter<Events extends Record<EventType, unknown> = Record<string, any>> implements IEmitterPort {
  private emitter: MittEmitter<Events>

  constructor() {
    this.emitter = mitt<Events>()
  }

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
    this.emitter.on(type, handler)
  }

  off<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
    this.emitter.off(type, handler)
  }

  emit<Key extends keyof Events>(type: Key, event: Events[Key]) {
    this.emitter.emit(type, event)
  }

  all() {
    return this.emitter.all
  }
}
