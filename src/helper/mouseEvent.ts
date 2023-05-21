import  { mouse, left, right, up, down }from "@nut-tree/nut-js"
import {Duplex} from "stream";

export async function mouseEvent(com:string, pos:string, stream:Duplex) {
    switch (com.split('_')[1]) {
        case 'up':
            mouse.move(up(+pos));
            stream.write(`${com}_${pos}px`);
            console.log(`${com} {${pos} px}`);
            break;
        case 'down':
            mouse.move(down(+pos));
            stream.write(`${com}_${pos}px`);
            console.log(`${com} {${pos} px}`);
            break;
        case 'left':
            mouse.move(left(+pos));
            stream.write(`${com}_${pos}px`);
            console.log(`${com} {${pos} px}`);
            break;
        case 'right':
            mouse.move(right(+pos));
            stream.write(`${com}_${pos}px`);
            console.log(`${com} {${pos} px}`);
            break;
        default:
            const {x,y} = await mouse.getPosition();
            stream.write(`mouse_position ${x},${y}`);
            console.log(`mouse_position ${x},${y}`);
            break;
    }
}