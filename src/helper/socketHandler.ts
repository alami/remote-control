import {Duplex} from "stream";
import mouseEvent from "./mouseEvent";
import drawEvent from "./drawEvent";
import screenEvent from "./screenEvent";
export default async function socketHandler (ch: string, stream: Duplex) {
    const [cmd, pos, pos2] = ch.split(' ')
    if (cmd.startsWith('mouse')) {
        await mouseEvent(cmd,pos,stream)
    }
    else if (cmd.startsWith('draw')) {
        await drawEvent(cmd, pos, pos2, stream)
    }
    else {
        await screenEvent(cmd, stream);
    }
}