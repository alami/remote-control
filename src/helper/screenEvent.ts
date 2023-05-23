import {Duplex} from "stream";
import {mouse, Region, screen} from "@nut-tree/nut-js";
import Jimp from "jimp"

export default async function screenEvent(cmd:string, stream:Duplex) {
    try {
        const {x, y} = await mouse.getPosition();
        await printScreen(+x, +y, stream);
        console.log(cmd);
    } catch (err) {
        console.log(err);
    }
}

async function printScreen(x:number, y:number, stream: Duplex){
    try {
        const reg = new Region(x, y, 200, 200)
        const {data, width, height} = await screen.grabRegion(reg);
        const jimpImg = new Jimp({ data, width, height }, (e:Error, img:Buffer) => {
            if(e) console.log(e);
            return img;
        });
        const img = await jimpImg.getBufferAsync('image/png');
        const base64Config = img.toString("base64");
        stream.write(`prnt_scrn ${base64Config}`);
    } catch (e) {
        console.log('Error: ', e);
    }
}