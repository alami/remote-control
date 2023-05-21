import {Duplex} from "stream";
import {Button, centerOf, mouse, Region, straightTo} from "@nut-tree/nut-js";

export default async function drawEvent (com:string, pos:string, pos2:string, stream:Duplex) {
    const {x, y} = await mouse.getPosition();
    switch (com.split('_')[1]) {
        case 'square':
            await drawSquare(+x, +y, +pos)
            stream.write(`${com}_${pos}px`);
            console.log(`${com} ${pos}px`);
            break;
        default:
            break;
    }
}

async function drawSquare(x:number, y:number, width:number) {
    await mouse.click(Button.LEFT);
    for (let i = 0; i < 4; i++) {
        if(i==0) {
            await mouse.drag(straightTo(centerOf(new Region(x, y, 0, width))));
        } else if(i===1){
            const {x, y} = await mouse.getPosition();
            await mouse.drag(straightTo(centerOf(new Region(x, y, 0-width, 0))));
        } else if(i===2) {
            const {x, y} = await mouse.getPosition();
            await mouse.drag(straightTo(centerOf(new Region(x, y, 0, 0-width))));
        } else {
            const {x, y} = await mouse.getPosition();
            await mouse.drag(straightTo(centerOf(new Region(x, y, width, 0))));
        }
    }
}
