import { Actor,Vector,Collider,Engine,Physics,Input } from "excalibur"
export class PlayerCharacter extends Actor 
{
    moveSpeed
    jumpHeight
    isMain
    grounded
    constructor(width,height,collisionType,moveSpeed,jumpHeight,isMain)
    {
        super({width:width,height:height,collisionType:collisionType})
        this.grounded = true;
        this.isMain = isMain;
        this.jumpHeight = jumpHeight;
        this.moveSpeed = moveSpeed;
    }
    onPreUpdate(engine)
    {
        if(this.isMain)
        {
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) > 0.5)
          {
            this.vel = new Vector(this.moveSpeed,this.vel.y);
          }
          else
          {
            if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) < -0.5)
            {
              this.vel = new Vector(-this.moveSpeed,this.vel.y);
            }
            else
            {
                this.vel = new Vector(0,this.vel.y);
            }
          }
        }
    }
}