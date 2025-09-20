src/
├── application/
│   └── MessageBus.ts              # Service API công khai: send, on,...
│
├── domain/
│   ├── entities/
│   │   └── MessageEntity.ts       # Định nghĩa entity message chuẩn
│   ├── types/
│   │   └── transport.types.ts     # TransportMessage, NormalMessage, LargeMessage
│   ├── services/
│   │   └── ChunkMessageProcessor.ts # Xử lý split/merge message lớn
│   └── repositories/
│       └── ITransportPort.ts      # Interface cổng transport
│
├── infrastructure/
│   ├── transports/
│   │   ├── MessageHandlerBase.ts  # Base class chung
│   │   ├── PostMessageTransport.ts
│   │   ├── ElectronAPITransport.ts
│   │   ├── FinSDKTransport.ts
│   │   └── WebKitTransport.ts
│   └── factories/
│       └── TransportFactory.ts    # Chọn transport phù hợp theo môi trường
│
├── utils/
│   ├── EventEmitter.ts
│   ├── Logger.ts
│   └── message.utils.ts           # encodeMessage, decodeMessage
│
└── index.ts                       # entry point (export public API)


         +----------------------+
         |   Application Layer  |
         |----------------------|
 Request | MessageHandler       | Response
-------->| ChunkProcessor       |<--------
         | Service (send/recv)  |
         +----------------------+
                   |
                   v
         +----------------------+
         | Infrastructure Layer |
         |----------------------|
         | PostMessageTransport |
         | ElectronTransport    |
         | FinSDKTransport      |
         +----------------------+
                   |
                   v
         +----------------------+
         |     External Env     |
         |----------------------|
         |   window.postMessage |
         |   electronAPI        |
         |   finsdk             |
         +----------------------+

         +----------------------+
         |      Domain Layer    |
         |----------------------|
         | Entities:            |
         |  - MessageEntity     |
         |  - NormalMessage     |
         |  - LargeMessage      |
         | Types:               |
         |  - Command           |
         |  - Request/Response  |
         |  - DTOs              |
         +----------------------+


npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0