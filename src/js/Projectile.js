import { Actor ,Engine} from "excalibur";
import {PlayerCharacter} from "./PlayerCharacter.js";
import {Weapon} from "./Weapon.js";

export class Projectile extends Actor 
{
    lifeTime;
    owner;
    graphic
    constructor(owner,lifeTime,width,height,color,graphic,radius)
    {
        super({width:width, height:height, color:color, radius:radius})
        this.owner = owner;
        this.lifeTime = lifeTime;
        this.graphic = graphic;
    }
    checkCollision(evt)
    {
        if(evt.other != this.owner) {
            console.log("Intersetcted " + evt.actor);
            if(evt.other instanceof PlayerCharacter)
            {
                if(!this.owner.isMain && !evt.other.isMain)
                {
                    return;
                }
                this.owner.attackedSuccessfully();
                evt.other.hurt(this.vel);
            }
           // if(!evt.other instanceof Weapon)
            //this.kill();
        }
    }
    onInitialize(engine)
    {
        this.on('collisionstart',(evt)=>this.checkCollision(evt));
    }
    onPostUpdate(engine)
    {
        this.lifeTime-=0.1;
        if(this.lifeTime<0.01)
        {
            console.log("Bullet Dead");
            this.kill();
        }
    }
    
}