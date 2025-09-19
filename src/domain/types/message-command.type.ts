import { Id } from '~/types'

export interface CommandDefinitions {
  getAllWallet: {
    request: GetAllWalletReq
    response: GetAllWalletRep
  }
  connectNode: {
    request: ConnectNodeReq
    response: ConnectNodeRep
  }
  deleteProfileById: {
    request: DeleteProfileByIdReq
    response: DeleteProfileByIdRep
  }
}

// Request/Response types
export type GetAllWalletReq = unknown
export type GetAllWalletRep = unknown

export type ConnectNodeReq = {
  wallets: { address: string }[]
  node: {
    ip: string
    port: number
  }
  storageAddress?: string
  storageHost?: string
}
export type ConnectNodeRep = unknown

export type DeleteProfileByIdReq = { id: Id }
export type DeleteProfileByIdRep = unknown
