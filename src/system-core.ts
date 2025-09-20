/**
 * SystemCore - singleton entrypoint cho React app
 *
 * - tự detect transport (TransportFactory.create())
 * - wrap MessageService (send/on/off)
 * - đảm bảo transport async-ready trước khi gửi/listen
 */
export class SystemCore {
  private static instance: SystemCore | null = null
  constructor() {}
  /** Lấy instance singleton */
  public static getInstance(): SystemCore {
    if (!SystemCore.instance) {
      SystemCore.instance = new SystemCore()
    }
    return SystemCore.instance
  }
}

export const systemCore = SystemCore.getInstance()
