import {Duplex} from "stream";
import {mouseEvent} from "./mouseEvent";
export async function socketHandler (ch: string, stream: Duplex) {
    const [com, pos, pos2] = ch.split(' ')
    if (com.startsWith('mouse')) {
        await mouseEvent(com,pos,stream)
    }
}