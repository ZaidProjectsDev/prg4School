import { Actor } from "excalibur";
import { Resources } from "./resources";
export class SelectableItemTable extends Actor
{
    constructor(width, height, color)
    {
        //Set the width and height of the table.
        super({width: width, height:height, color:color})
        
    }
}