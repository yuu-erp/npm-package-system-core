import z from 'zod'
import type { Command, Request } from '~/domain/types'

export const PayloadDTOchema = <C extends Command>(command: C, requestSchema: z.ZodType<Request<C>>) => {
  return {
    command: z.literal(command),
    value: requestSchema,
    messageId: z.string(),
    appId: z.string().optional(),
    windowId: z.string().optional(),
    isSocket: z.boolean().optional()
  }
}

export type PayloadDTO = z.infer<typeof PayloadDTOchema>
