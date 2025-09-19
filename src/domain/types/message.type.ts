import { CommandDefinitions } from './message-command.type'
// Lấy danh sách command
export type Command = keyof CommandDefinitions
// Generic cho request/response theo tên command
export type Request<K extends Command> = CommandDefinitions[K]['request']

export type Response<K extends Command> = CommandDefinitions[K]['response']
