import {Duplex} from "stream";
import {Button, centerOf, mouse, Region, straightTo} from "@nut-tree/nut-js";

export default async function drawEvent (cmd:string, pos:string, pos2:string, stream:Duplex) {
    const {x, y} = await mouse.getPosition();
    switch (cmd.split('_')[1]) {
        case 'square':
            await drawSquare(+x, +y, +pos)
            stream.write(`${cmd}_${pos}px`);
            console.log(`${cmd} ${pos}px`);
            break;
        case 'circle':
            await drawCircle(+x, +y, +pos)
            stream.write(`${cmd}_${pos}px`);
            console.log(`${cmd} ${pos}px`);
            break;
        case 'rectangle':
            await drawRectangular(+x, +y, +pos, +pos2)
            stream.write(`${cmd}_${pos}px_${pos2}px`);
            console.log(`${cmd} ${pos}px ${pos2}px`);
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

async function drawCircle(x:number, y:number, radius:number) {
    await mouse.click(Button.LEFT);
    for (let i = 0; i <= (Math.PI * 2); i += 0.1) {
        const newX = x + (radius * Math.cos(i))/2;
        const newY = y + (radius * Math.sin(i))/2;
        await mouse.drag(straightTo(centerOf(new Region(newX, newY, 0-radius, 0))));
    };
}

async function drawRectangular(top:number, left:number, width:number, height:number) {
    await mouse.click(Button.LEFT);
    for (let i = 0; i < 4; i++) {
        if(i==0) {
            await mouse.drag(straightTo(centerOf(new Region(top, left, 0, height))));
        } else if(i===1){
            const {x, y} = await mouse.getPosition();
            await mouse.drag(straightTo(centerOf(new Region(x, y, 0-width, 0))));
        } else if(i===2) {
            const {x, y} = await mouse.getPosition();
            await mouse.drag(straightTo(centerOf(new Region(x, y, 0, 0-height))));
        } else {
            const {x, y} = await mouse.getPosition();
            await mouse.drag(straightTo(centerOf(new Region(x, y, width, 0))));
        }
    }
}
