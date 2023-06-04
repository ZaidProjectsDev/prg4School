import {Actor, Vector,Color, Collider, Engine, Physics, Graphic, Input, GraphicsComponent, Animation} from "excalibur"
import {Resources} from "./resources.js";
import {Projectile} from "./Projectile.js";
export class PlayerCharacter extends Actor 
{
    engine
    health
    moveSpeed
    jumpHeight
    isMain
    grounded

    leftAnimation
    rightAnimation
    facingLeft

    attackedSomethingSuccessfully
    constructor(width,height,collisionType,moveSpeed,jumpHeight,isMain)
    {
        super({width:width,height:height,collisionType:collisionType})
        this.grounded = true;
        this.isMain = isMain;
        this.jumpHeight = jumpHeight;
        this.moveSpeed = moveSpeed;
    }
    hurt(vel)
    {
        if(this.health<1) {
            this.kill();
        }
        else
        {


            if(vel.x> 0.01)
            {
                this.facingLeft = false;
            }
            if(vel.x< -0.01)
            {
                this.facingLeft = true;
            }
            this.health+=-1;
        }
    }
    attackedSuccessfully()
    {
        this.attackedSomethingSuccessfully = true;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.engine = _engine;
        this.leftAnimation = Resources.Fish.toSprite();
        this.leftAnimation.scale = new Vector(-1,1);
        this.rightAnimation = Resources.Fish.toSprite();
        this.rightAnimation.scale = new Vector(1,1);
    }
    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        if(this.facingLeft)
        {
            this.graphics.use(this.leftAnimation);
        }
        else
        {
            this.graphics.use(this.rightAnimation);
        }
        if(this.attackedSomethingSuccessfully)
        {
            this.engine.currentScene.camera.shake(100, 100,100);
            this.attackedSomethingSuccessfully = false;
        }
    }
    //Combat
    fireWeapon(facingLeft)
    {
        let projectile = new Projectile(this, 2, 5, 5, Color.Red, null,5);
        if(facingLeft) {
            projectile.pos = new Vector(this.pos.x + 1, this.pos.y + 2);
            projectile.vel = new Vector(1200, this.vel.y*0.5);
        }
        else
        {
            projectile.pos = new Vector(this.pos.x - 1, this.pos.y + 2);
            projectile.vel = new Vector(-1200, this.vel.y*0.5);
        }
        if(!this.attackedSomethingSuccessfully)
        this.engine.currentScene.camera.shake(0, 2,10);
        this.engine.add(projectile);
    }

    onPreUpdate()
    {
        if(this.isMain)
        {
            if(this.engine.input.keyboard.isHeld(Input.Keys.Space))
            {
                this.fireWeapon(this.facingLeft);
            }
        if (this.engine.input.keyboard.isHeld(Input.Keys.D) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) > 0.5)
          {
            this.vel = new Vector(this.moveSpeed,this.vel.y);
            this.facingLeft = true;
          }
          else
          {
            if (this.engine.input.keyboard.isHeld(Input.Keys.A) || this.engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX) < -0.5)
            {
              this.vel = new Vector(-this.moveSpeed,this.vel.y);
                this.facingLeft = false;
            }
            else
            {
                this.vel = new Vector(0,this.vel.y);
            }
          }
        }
    }
}