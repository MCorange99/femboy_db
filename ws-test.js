const wsc = require("websocket").client;
const apit = require("./api-test");
const client = new wsc();

let timeout = null;

const email = "";
const passwd = "";


client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
        destroy();
    });
    connection.on('close', function(e, a) {
        console.log('echo-protocol Connection Closed');
        console.log(`[${e}] ${a}`);
        destroy();
    });
    connection.on('message', async function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
            const data = JSON.parse(message.utf8Data);
            if (data.op == 0) return await verify(connection, {email, passwd});
            if (data.op == 1) return set_heartbeat(connection, data.heartbeat.interval)
            if (data.op == 4) return heartbeat(connection)
        }
    });
    process.on('SIGINT', () => {
        connection.close();
        process.exit();
    });
});



client.connect('ws://localhost:8080/v1', 'echo-protocol');

async function verify(conn, creds) {
    const token = await apit.login(creds.email, creds.password);
    
    const data = JSON.stringify({
        op: 2,
        token: token["token"]
    })
    console.log(data)
    await conn.sendUTF(data)
    console.log("sent")
}

let interval = 0;

function set_heartbeat(conn, _interval) {
    interval = _interval
    heartbeat(conn);
}

function heartbeat(conn) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        console.log("sent heartbeat")
        const data = JSON.stringify({
            op: 3
        })
        conn.sendUTF(data)

    }, interval)
}


function destroy() {
    clearTimeout(timeout);
}