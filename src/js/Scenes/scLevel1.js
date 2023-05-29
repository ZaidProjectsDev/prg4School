import {Actor, Debug, Label, Physics, Scene, Vector,Color ,Font, FontUnit, Resource, CollisionType, Collider, Rectangle, Circle, CircleCollider} from "excalibur"
import { Button } from "../Generics/Button";
import { Resources } from "../resources";
import { BipedPlayer } from "../BipedPlayer";
import { Player } from "../Player";
import { PlayerCharacter } from "../PlayerCharacter";

export class scLevel1 extends Scene
{
    player
    engine
    ground0
    slope0
    onInitialize(engine)
    {
        this.spawnPlayer(engine);
        engine.currentScene.camera.strategy.elasticToActor(
            this.player,
            1,
            0.5
          )

        this.ground0 = new Actor({width : 3000, height: 64, color:Color.Red,collisionType: CollisionType.Fixed})
        this.ground0.pos = new Vector(200,600);
        this.ground0.body.collisionType = CollisionType.Fixed;

     
        this.add(this.ground0);
    }

    spawnPlayer(engine)
    {
        Physics.useArcadePhysics();
        Physics.gravity = new Vector(0,250);

        this.player = new  PlayerCharacter(Resources.Fish.width,Resources.Fish.height,CollisionType.Active,300,300,true);//BipedPlayer(Resources.Fish.width,Resources.Fish.height);
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
        console.log(this.player.pos.y);
       engine.currentScene.camera.y-=200;

       if(this.player.vel.x>4)
       {
        engine.currentScene.camera.x+=50;
       }
       
       if(this.player.vel.x<-4)
       {
        engine.currentScene.camera.x-=50;
       }
    }
    onDeactivate(engine)
    {
        this.player.kill();
    }
}