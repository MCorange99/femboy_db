/* eslint-disable no-constant-condition */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _Server from "./structures/Server";
import Websocket from "./websocket";
import Logger from "@mcorange9/mclog";
const DEBUG = (process.env.DEBUG === "TRUE" || "true" || "yes") ? true : false;
const file_logging = false;


global.logger = new Logger(DEBUG, file_logging);
global.Server = new _Server();
global.websocket = new Websocket();