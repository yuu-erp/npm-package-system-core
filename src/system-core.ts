import { ITransportPort } from './domain/repositories'
import { TransportFactory } from './infrastructure/transport/transport.factory'

export class SystemCore {
  private transport: ITransportPort
  constructor() {
    this.transport = TransportFactory.create()
  }
}
