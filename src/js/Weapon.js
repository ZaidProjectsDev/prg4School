import {Actor, Animation, CollisionType, Color, range, Timer, vec, Vector} from "excalibur";
import {WeaponType} from "./WeaponType.js";
import {Projectile} from "./Projectile.js";
import {Resources} from "./resources.js";

export class Weapon extends Actor
{
    weaponType
    rootOwner
    pickedUp
    fireEffect
    fireEffectActor
    engine
    firing
    coolDown
    killTimer
    constructor(weaponType,rootOwner, collisionGroup) {
        super({width:64,height:64,collisionType:CollisionType.Active, collisionGroup:collisionGroup});
        this.weaponType = weaponType;
        this.fireEffect = this.weaponType.fireEffect;
        this.rootOwner = rootOwner;
        this.firing = false;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.graphics.use(this.weaponType.weaponGraphic);
        this.fireEffectActor = new Actor({ anchor: new Vector(-0.0125,0.5)});
        this.fireEffectActor.graphics.add("fire",this.fireEffect);


        this.addChild(this.fireEffectActor);
        this.engine = _engine;

        this.killTimer =  new Timer({fcn:() =>this.checkShouldKill(), interval:2000});
        this.engine.add(this.killTimer);
        this.killTimer.start();
    }

    checkShouldKill()
    {
        if(!this.rootOwner && !this.pickedUp)
        {
            this.kill();
        }
    }
    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        if(!this.firing)
        {
            this.coolDown = 0;
            this.fireEffectActor.graphics.hide();
        }
        else
        {

            this.fireEffectActor.graphics.use("fire");
            this.coolDown+=1;
            if(this.coolDown>5)
            {
                this.firing = false;
            }
        }
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);


        if(this.rootOwner)
        {
            if(this.parent != this.rootOwner)
            {
                this.rootOwner.addChild(this);
            }
            if(this.rootOwner.facingLeft)
            {

                this.fireEffectActor.scale = new Vector(1,1);
                this.fireEffectActor.anchor = new Vector(0.0125,0.5);
                this.graphics.use(this.weaponType.weaponGraphic)

            }
            else {
                this.fireEffectActor.scale = new Vector(-1,1);
                this.fireEffectActor.anchor = new Vector(-0.0125,0.5);
                this.graphics.use(this.weaponType.weaponGraphicLeft)
            }
            this.body.collisionType = CollisionType.PreventCollision;
            this.body.useGravity = false;
            this.body.setSleeping(true);
            if(!this.rootOwner.facingLeft) {
                this.pos = new Vector(1.5, 0.025);
            }
            else
            {
                this.pos = new Vector(-1.5, 0.025);
            }
        }
    }

    pickUpWeapon(newOwner)
    {
        if(!this.pickedUp)
        {
            this.rootOwner = newOwner;
            this.rootOwner.equippedWeapon = this;
            this.pickedUp = true;
        }
    }
    stopFiring()
    {
        this.firing = false;
    }
    fire(facingLeft)
    {
        if(this.coolDown<2) {
            this.firing = true;
            let projectile = new Projectile(this.rootOwner, 8, 5, 5, Color.Red, null, 5);
            if (facingLeft) {
                projectile.pos = new Vector(this.rootOwner.pos.x - 1, this.rootOwner.pos.y + 2);
                //projectile.pos = new Vector(0.01, 0.01);
                projectile.vel = new Vector(1200, this.vel.y * 0.5);
            } else {
                projectile.pos = new Vector(this.rootOwner.pos.x + 1, this.rootOwner.pos.y + 2);
                // projectile.pos = new Vector(this.pos.x - 1, this.pos.y + 2);
                projectile.vel = new Vector(-1200, this.vel.y * 0.5);
            }
            if (!this.rootOwner.attackedSomethingSuccessfully)
                this.engine.currentScene.camera.shake(0, 2, 10);
            this.engine.currentScene.add(projectile);
        }


    }
}