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
type GetAllWalletReq = unknown
type GetAllWalletRep = { address: string }[]

type ConnectNodeReq = {
  wallets: { address: string }[]
  node: {
    ip: string
    port: number
  }
  storageAddress?: string
  storageHost?: string
}
type ConnectNodeRep = unknown

type DeleteProfileByIdReq = { id: Id }
type DeleteProfileByIdRep = unknown
