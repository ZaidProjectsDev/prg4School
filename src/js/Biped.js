import { Interactable } from "./Interactable"
import { Stats } from "./GameCore"
import { CollisionType, Physics, Vector } from "excalibur";
import { Collider } from "excalibur";
export class Biped extends Interactable
{
    stats 
    constructor(width,height)
    {
        super({width:width, height:height,collisionType: CollisionType.Active});
    }

}