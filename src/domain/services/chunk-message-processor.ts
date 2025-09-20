import { LargeMessage } from '~/types'

/**
 * ChunkMessageProcessor
 *
 * Lớp này chịu trách nhiệm chia nhỏ (split) và ghép lại (merge)
 * các message có kích thước lớn khi truyền qua transport.
 *
 * Sử dụng trong trường hợp message vượt quá giới hạn cho phép
 * của môi trường (VD: postMessage, Electron IPC, WebKit handler...).
 */
export class ChunkMessageProcessor {
  /**
   * Bộ nhớ tạm lưu các phần của message lớn chưa ghép xong.
   * Key: command, Value: mảng chứa các chunk theo index.
   */
  private readonly receiveChunks: Map<string, string[]> = new Map()

  /**
   * Chia nhỏ một message thành nhiều {@link LargeMessage}.
   *
   * @param message - Nội dung message gốc (chuỗi JSON.stringify).
   * @param command - Tên command để gắn vào mỗi chunk (dùng làm key ghép).
   * @param chunkSize - Kích thước tối đa mỗi chunk (mặc định: 16,000 ký tự).
   * @returns Danh sách các chunk {@link LargeMessage}.
   *
   * @example
   * ```ts
   * const processor = new ChunkMessageProcessor()
   * const chunks = processor.split(JSON.stringify(entity), 'executeCommand')
   * ```
   */
  public split(message: string, command: string, chunkSize = 24_000): LargeMessage[] {
    const totalChunks = Math.ceil(message.length / chunkSize)
    const result: LargeMessage[] = []

    for (let i = 0; i < totalChunks; i++) {
      const chunk = message.slice(i * chunkSize, (i + 1) * chunkSize)
      result.push({
        type: 'large',
        chunk,
        index: i,
        totalChunks,
        command
      })
    }

    return result
  }

  /**
   * Ghép một {@link LargeMessage} vào bộ nhớ tạm.
   * Nếu đã nhận đủ các chunk thì trả về message gốc.
   *
   * @param msg - Một chunk thuộc message lớn.
   * @returns
   * - Chuỗi JSON.stringify(...) đầy đủ nếu đã nhận đủ chunk.
   * - `null` nếu chưa đủ chunk để ghép.
   *
   * @example
   * ```ts
   * const fullMessage = processor.merge(incomingChunk)
   * if (fullMessage) {
   *   const entity = JSON.parse(fullMessage)
   *   console.log('Message đã ghép:', entity)
   * }
   * ```
   */
  public merge(message: LargeMessage): string | null {
    const key = message.command
    if (!this.receiveChunks.has(key)) {
      this.receiveChunks.set(key, [])
    }

    const array = this.receiveChunks.get(key)!
    array[message.index] = message.chunk

    // kiểm tra đã đủ chunk chưa
    if (array.filter(Boolean).length === message.totalChunks) {
      const full = array.join('')
      this.receiveChunks.delete(key) // dọn bộ nhớ
      return full
    }

    return null
  }
}
