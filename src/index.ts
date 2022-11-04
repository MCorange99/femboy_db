/* eslint-disable no-constant-condition */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
require("json5/lib/register");
const _Server = require("./structures/Server");
const Logger = require("@mcorange9/mclog");
const DEBUG = (process.env.DEBUG === "TRUE" || "true" || "yes") ? true : false;
const file_logging = false;


global.logger = new Logger(DEBUG, file_logging);
global.Server = new _Server();
