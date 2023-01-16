/* eslint-disable no-var */

import Websocket from "../websocket";

declare global {
    var logger: _logger;
    var Server: _Server;
    var websocket: Websocket;
}

export {};