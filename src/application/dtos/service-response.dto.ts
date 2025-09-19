import z from 'zod'

export const ServiceResponseDtoSchema = z.object({
  success: z.boolean()
})

export type ServiceResponseDto = z.infer<typeof ServiceResponseDtoSchema>
