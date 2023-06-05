import {
    Actor,
    Debug,
    Label,
    Physics,
    Scene,
    Vector,
    Color,
    Font,
    FontUnit,
    Resource,
    CollisionType,
    Collider,
    Rectangle,
    Circle,
    CircleCollider,
    EasingFunctions, Axis, range, Animation, AnimationStrategy
} from "excalibur"
import { Resources } from "../resources";
import { PlayerCharacter } from "../PlayerCharacter";
import { PlayerStatsHUD } from "../PlayerStatsHUD";
import {EnemyCharacter} from "../EnemyCharacter.js";
import {WeaponType} from "../WeaponType.js";
import {Weapon} from "../Weapon.js";

export class scLevel1 extends Scene
{
    player
    engine
    ground0
    slope0
    playerStatsHud
    xCameraSmoothOffset;
    yCameraSmoothOffset;
    initalized
    onInitialize(engine)
    {
        if(!this.initalized) {
            this.startEntireScene(engine);
            this.initalized = true;
        }

    }
    startEntireScene(engine)
    {
        //  engine.showDebug(true);
        this.spawnPlayer(engine);
        this.playerStatsHud = new PlayerStatsHUD(32,32,Color.Red,engine,5);
        this.playerStatsHud.player = this.player;
        this.engine.add(this.playerStatsHud);
        engine.currentScene.camera.strategy.elasticToActor(this.player,1,0.1);
        this.xCameraSmoothOffset = 0;
        this.yCameraSmoothOffset =0;
        this.ground0 = new Actor({width : 3000, height: 64, color:Color.Red,collisionType: CollisionType.Fixed})
        this.ground0.pos = new Vector(200,600);
        this.ground0.body.collisionType = CollisionType.Fixed;

        let enemy = new EnemyCharacter(Resources.Fish.width,Resources.Fish.height,CollisionType.Active,300,300,false,engine.playerCollisionCollideWith);
        enemy.pos = new Vector(engine.drawWidth/4, engine.drawHeight/2);
        enemy.health = 10;

        let enemy2 = new EnemyCharacter(Resources.Fish.width,Resources.Fish.height,CollisionType.Active,300,300,false, engine.playerCollisionCollideWith);
        enemy.pos = new Vector(engine.drawWidth/1.25, engine.drawHeight/2);
        this.add(enemy);
        this.add((enemy2))
        this.add(this.ground0);


        const testWeaponType =new WeaponType(Resources._bazooka, Animation.fromSpriteSheet(engine.fireEffectSpriteSheet,range(0,2),100, AnimationStrategy.Loop),100);
        const testWeapon = new Weapon(testWeaponType,null);
        for(let i=0; i<5; ++i)
        {
            const newWeapon = new Weapon(testWeaponType,null);
            newWeapon.pos = new Vector(this.player.pos.x+100*i, this.player.pos.y+3*i)
            newWeapon.vel = new Vector(i,-5);
            this.add(newWeapon);
        }

        this.add(testWeapon);
    }
    spawnPlayer(engine)
    {

        Physics.gravity = new Vector(0,250);

        this.player = new  PlayerCharacter(Resources.Fish.width,Resources.Fish.height,CollisionType.Active,300,300,true, engine.playerCollisionCollideWith);//BipedPlayer(Resources.Fish.width,Resources.Fish.height);
        this.player.graphics.use(Resources.Fish.toSprite());
        this.player.pos = new Vector(engine.drawWidth/2, engine.drawHeight/2);
        this.player.body.collisionType = CollisionType.Active;
        this.player.body.useGravity = true;
        this.add(this.player)
      //  this.player.initalizeStats(100,100,100,100);
      //  this.player.isMainPlayer = true;
    }
    onPreUpdate(engine)
    {


      if(this.player.grounded)
      {
          if(this.yCameraSmoothOffset>-1200)
          {
              this.yCameraSmoothOffset-=50;
          }
          else
          {
              if(this.yCameraSmoothOffset<-1200)
              this.yCameraSmoothOffset+=50;
          }
      }
      else
      {

              this.yCameraSmoothOffset+=50;


              if(this.yCameraSmoothOffset>700)
              this.yCameraSmoothOffset =700;

      }

       if(this.player.facingLeft)
       {
           if(this.xCameraSmoothOffset<300) {
               this.xCameraSmoothOffset += 10;
           }
           else
           {
               this.xCameraSmoothOffset = 300;
           }
       }
       else
       {
           if(this.xCameraSmoothOffset>-300) {
               this.xCameraSmoothOffset -= 10;
           }
           else
           {
               this.xCameraSmoothOffset = -300;
           }
       }
        engine.currentScene.camera.x +=this.xCameraSmoothOffset;
        engine.currentScene.camera.y+=this.yCameraSmoothOffset;
        engine.currentScene.camera.zoom = 0.25;
    }
    onDeactivate(engine)
    {
       this.clear(false);
    }
    onActivate(_context) {
        super.onActivate(_context);
            if(this.isInitialized)
            this.startEntireScene(_context.engine);

    }
}