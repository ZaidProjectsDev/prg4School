import {PlayerCharacter} from "./PlayerCharacter.js";
import {randomIntInRange, Vector} from "excalibur";

export class EnemyCharacter extends PlayerCharacter
{
    randomFireWeapon()
    {
        this.fireWeapon(this.facingLeft);

    }
    randomJump()
    {
        this.vel = new Vector(this.vel.x, -500);
        this.grounded = false;
        this.jumpTimer.reset();
        this.jumpTimer.start();
        this.jumping = true;
    }
onPreUpdate(engine) {
    super.onPreUpdate(engine);
    if(!this.isMain)
    {
        if(this.grounded)
        {
            if(this.canDoRandomThing) {
                const randAction = 1*randomIntInRange(-5,2)
                if(randAction>0) {
                    this.randomJump();
                }
                if(randAction<0) {
                    this.randomFireWeapon()
                }
                if(randAction>1)
                {
                    this.facingLeft =!this.facingLeft;
                }
                if(randAction<-1)
                {
                  if(engine.currentScene.player)
                  {
                      if(engine.currentScene.player.pos.x> this.pos.x+50)
                      {
                          this.facingLeft = true;
                          this.randomFireWeapon();
                          this.randomFireWeapon();
                          this.vel = new Vector(this.moveSpeed,this.vel.y);
                      }
                      else
                      {
                          if(engine.currentScene.player.pos.x< this.pos.x-50)
                          {
                              this.facingLeft = false;
                              this.randomFireWeapon();
                              this.randomFireWeapon();
                              this.vel = new Vector(-this.moveSpeed,this.vel.y);
                          }
                      }
                  }
                }
                this.canDoRandomThing = false;
            }

        }
    }
}
}