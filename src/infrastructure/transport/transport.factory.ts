import { ITransportPort } from '~/domain/repositories'
import { ElectronAPITransport, FindSDKTransport, PostMessageTransport } from '.'

export class TransportFactory {
  static create(): ITransportPort {
    if (this.isElectron()) return new ElectronAPITransport()
    if (this.isFindSDK()) return new FindSDKTransport()
    return new PostMessageTransport()
  }
  private static isElectron(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.electronAPI !== 'undefined' &&
      typeof window.electronAPI.sendMessage === 'function'
    )
  }
  private static isFindSDK() {
    return (
      typeof window !== 'undefined' && typeof window.finsdk !== 'undefined' && typeof window.finsdk.call === 'function'
    )
  }
}
