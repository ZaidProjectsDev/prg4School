import { Interactable } from "./Interactable"
import { Stats } from "./GameCore"
import { CollisionType, Physics, Vector } from "excalibur";
import { Collider } from "excalibur";
export class Biped extends Interactable
{
    stats 
    constructor()
    {
        super({collisionType: CollisionType.Active});
    }

}