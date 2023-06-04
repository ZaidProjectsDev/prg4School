import { Actor, Vector } from "excalibur";
import { Stats } from "./GameCore";
import { Input } from "excalibur";
export class Interactable extends Actor
{
    isMainPlayer
    stats 
    constructor(width,height)
    {
        super({width:width,height:height})
    }

    initalizeStats(health,moveSpeed,jumpVelocity,ammo)
    {
        this.stats = new Stats(health,moveSpeed,jumpVelocity,ammo);
    }
    setDefaultSats(stats)
    {
        this.stats = stats
    }
    damage(amount, damageType)
    {
        this.stats-=amount;
    }
    onPreUpdate(engine,delta)
    {
        if(this.isMainPlayer)
        {
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) > 0.5)
          {
            this.vel = new Vector(this.stats.moveSpeed,this.vel.y);
            this.scale = new Vector(1,1);
          }
          else
          {
            if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) < -0.5)
            {
              this.vel = new Vector(-this.stats.moveSpeed,this.vel.y);
                this.scale = new Vector(-1,1);
            }
            else
            {
                this.vel = new Vector(0,this.vel.y);
            }
          }
        }
    }

}