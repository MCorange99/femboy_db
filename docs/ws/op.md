# op codes

## OP 0. Welcome (server -> client)

This OP code will be sent on connect to let the client know it has connected

## OP 1. Hello (server -> client)

This OP code will be sent to ping the client and send the heart beat interval

## OP 2. verify (server <- client)

This OP code will be sent to the server with the client user token to verify

## OP 3. heart beat send (server <- client)

This OP code will be sent to the server to verify the client is still connected and listening

## OP 4. heart beat receive (server -> client)

This OP code will be sent to the client replying to OP code 3 (op code send) to tell the client that the packet was received

## OP 5. event (server -> client)

This OP code will be sent when an event occurs like a message.
