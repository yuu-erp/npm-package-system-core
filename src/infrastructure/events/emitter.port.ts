// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IEmitterPort<Events extends Record<string, any> = Record<string, any>> {
  on<Key extends keyof Events>(type: Key, handler: (event: Events[Key]) => void): void
  off<Key extends keyof Events>(type: Key, handler: (event: Events[Key]) => void): void
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  all(): void
}
