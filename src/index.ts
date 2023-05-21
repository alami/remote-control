import { httpServer } from "./http_server/index";
import "dotenv/config"
import {createWebSocketStream, WebSocket, WebSocketServer} from "ws";
import {socketHandler} from './helper/socketHandler'

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT = Number(process.env.WS_PORT) || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({port: WS_PORT});

try {
    wss.on("connection", async (ws: WebSocket)=>{
        const stream = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false})
        console.log(`WS-server was started on ${WS_PORT} port`)
        stream.on('data', async (ch:string)=>{
            await socketHandler(ch, stream)
        })
        ws.send(`ws_start ${WS_PORT}`)
        ws.on('close', ()=>{
            console.log('WS closed')
        })
    })
} catch (e) {
    console.log('Error: ', e)
}
process.on('SIGINT',()=>{
    console.log('Sorry, WS-server will be closed.')
    wss.close()
    process.exit()
})

