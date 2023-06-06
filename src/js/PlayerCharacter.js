import {
    Actor,
    Vector,
    Color,
    Collider,
    Engine,
    Physics,
    Graphic,
    Input,
    GraphicsComponent,
    Animation,
    Side,
    Timer,
    CollisionGroup, Random
} from "excalibur"
import {Resources} from "./resources.js";
import {Projectile} from "./Projectile.js";
import {Weapon} from "./Weapon.js";
import {ScoreTracker} from "./ScoreTracker.js";

export class PlayerCharacter extends Actor 
{
    engine
    health
    moveSpeed
    jumpHeight
    isMain
    grounded
    jumping

    leftAnimation
    rightAnimation
    facingLeft

    jumpTimer
    attackedSomethingSuccessfully
    randomActionTimer
    canDoRandomThing

    equippedWeapon
    constructor(width,height,collisionType,moveSpeed,jumpHeight,isMain, collisionGroup)
    {
        super({width:width,height:height,collisionType:collisionType, collisionGroup: collisionGroup})
        this.grounded = true;
        this.isMain = isMain;
        this.jumpHeight = jumpHeight;
        this.moveSpeed = moveSpeed;
        this.canDoRandomThing = true;
    }
    stopJumpGravity()
    {
        this.jumping = false;
    }
    hurt(vel)
    {
        if(this.health<1) {
            if(this.isMain)
                this.engine.triggerGameOver();
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
        this.jumpTimer = new Timer({fcn:() =>this.stopJumpGravity(), interval:500});
        const random = new Random(7000*this.pos.x);
        this.randomActionTimer =new Timer({
            random,
            randomRange: [0, 1000],
            interval: 3000,
            fcn:() =>this.resetRandomTimer(), repeats: true
        })
    this.engine.add(this.randomActionTimer)
        this.randomActionTimer.start();
            //new Timer({fcn:() => this.resetRandomTimer(), interval:300})

        this.engine.add(this.jumpTimer);
        this.leftAnimation = Resources.Fish.toSprite();
        this.leftAnimation.scale = new Vector(-1,1);
        this.rightAnimation = Resources.Fish.toSprite();
        this.rightAnimation.scale = new Vector(1,1);
        this.on('postcollision',(evt) => this.checkCollision(evt));
        if(this.health== null || this.health ==0)
        {
            this.health = 20;
        }

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
            if(this.isMain) {
                ScoreTracker.instance.addToScore(300);
            }
            this.attackedSomethingSuccessfully = false;
        }
    }
    //Combat
    fireWeapon(facingLeft)
    {
        if(this.equippedWeapon!=null)
        {
            this.equippedWeapon.fire(facingLeft);
        }
    }
    checkCollision(evt)
    {
        if (evt.side === Side.Bottom) {
            this.grounded = true;
        }
        if(evt.other instanceof Weapon)
        {
            console.log("TOUCHED WEAPON");
            if(!evt.other.pickedUp && !this.equippedWeapon)
            {
                evt.other.pickUpWeapon(this);
            }
        }
    }

    resetRandomTimer()
    {
        this.canDoRandomThing  = true;
        console.log("Random")
    }
    onPreUpdate()
    {
        if(!this.jumping && !this.grounded)
        {
            this.vel = new Vector(this.vel.x, Physics.gravity.y*2);
        }
        if(this.pos.y>900)
        {
            this.hurt(1000)
        }
        if(this.isMain)
        {
            if(this.engine.input.keyboard.isHeld(Input.Keys.Space) || this.engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1))
            {
                this.fireWeapon(this.facingLeft);
            }
            if(this.engine.input.keyboard.isHeld(Input.Keys.W) || this.engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face2))
            {
                if(this.grounded) {
                    this.vel = new Vector(this.vel.x, -500);
                    this.grounded = false;
                    this.jumpTimer.reset();
                    this.jumpTimer.start();
                    this.jumping = true;
                }
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