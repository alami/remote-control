import {Duplex} from "stream";
import mouseEvent from "./mouseEvent";
import drawEvent from "./drawEvent";
export default async function socketHandler (ch: string, stream: Duplex) {
    const [com, pos, pos2] = ch.split(' ')
    if (com.startsWith('mouse')) {
        await mouseEvent(com,pos,stream)
    }
    else if (com.startsWith('draw')) {
        await drawEvent(com, pos, pos2, stream)
    }
}