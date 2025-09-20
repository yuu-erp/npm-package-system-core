import { ITransportPort } from '~/domain/repositories'
import { ElectronAPITransport, FindSDKTransport, WebkitTransport } from '.'
import { InternalServerErrorException } from '~/exceptions/exceptions'

export class TransportFactory {
  static create(): ITransportPort {
    if (this.isElectron()) return new ElectronAPITransport()
    if (this.isWebkit()) return new WebkitTransport()
    if (this.isFindSDK()) return new FindSDKTransport()
    throw new InternalServerErrorException('No suitable transport available for the current environment')
  }
  private static isElectron(): boolean {
    return (
      typeof window === 'undefined' ||
      typeof window.electronAPI === 'undefined' ||
      typeof window.electronAPI.sendMessage !== 'function' ||
      typeof window.electronAPI.onMessage !== 'function'
    )
  }
  private static isFindSDK() {
    return (
      typeof window === 'undefined' || typeof window.finsdk === 'undefined' || typeof window.finsdk.call !== 'function'
    )
  }

  private static isWebkit(): boolean {
    return (
      typeof window === 'undefined' || typeof window.finsdk === 'undefined' || typeof window.finsdk.call !== 'function'
    )
  }
}
