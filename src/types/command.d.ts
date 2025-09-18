import type { Id } from '.'

export type GetAllWalletReq = unknown
export type GetAllWalletRep = unknown

export type ConnectNodeReq = {
  ip: string
  port: string
}
export type ConnectNodeRep = {
  success: true
}

export type DeleteProfileByIdReq = {
  id: Id
}
export type DeleteProfileByIdRep = unknown

export type CommandRequestMap = {
  getAllWallet: GetAllWalletReq
  connectNode: ConnectNodeReq
  deleteProfileById: DeleteProfileByIdReq
}

export type CommandResponseMap = {
  getAllWallet: GetAllWalletRep
  connectNode: ConnectNodeRep
  deleteProfileById: DeleteProfileByIdRep
}

export type CommandMessage = keyof CommandRequestMap
