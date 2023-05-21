import  { mouse, left, right, up, down }from "@nut-tree/nut-js"
import {Duplex} from "stream";

export default async function mouseEvent(cmd:string, pos:string, stream:Duplex) {
    switch (cmd.split('_')[1]) {
        case 'up':
            mouse.move(up(+pos));
            stream.write(`${cmd}_${pos}px`);
            console.log(`${cmd} {${pos} px}`);
            break;
        case 'down':
            mouse.move(down(+pos));
            stream.write(`${cmd}_${pos}px`);
            console.log(`${cmd} {${pos} px}`);
            break;
        case 'left':
            mouse.move(left(+pos));
            stream.write(`${cmd}_${pos}px`);
            console.log(`${cmd} {${pos} px}`);
            break;
        case 'right':
            mouse.move(right(+pos));
            stream.write(`${cmd}_${pos}px`);
            console.log(`${cmd} {${pos} px}`);
            break;
        default:
            const {x,y} = await mouse.getPosition();
            stream.write(`mouse_position ${x},${y}`);
            console.log(`mouse_position ${x},${y}`);
            break;
    }
}