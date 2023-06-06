import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType,
    Random,
    randomIntInRange,
    range,
    Timer,
    Vector
} from "excalibur";
import {EnemyCharacter} from "./EnemyCharacter.js";
import {Resources} from "./resources.js";
import {WeaponType} from "./WeaponType.js";
import {Weapon} from "./Weapon.js";

export class Spawner extends Actor{

    constructor() {
        super();

        this.random = new Random(4130)

    }

    onInitialize(engine) {
        this.timer = new Timer({
            fcn: () => this.spawn(engine),
            interval: 1000,
            repeats: true
        })
        engine.currentScene.add(this.timer)
        this.timer.start()
    }

    spawn(engine) {
        console.log("spawn")
        const enemy = new EnemyCharacter(Resources.Fish.width,Resources.Fish.height,CollisionType.Active,300,300,false,engine.playerCollisionCollideWith);
        const weaponType=new WeaponType(Resources._bazooka, Animation.fromSpriteSheet(engine.fireEffectSpriteSheet,range(0,2),100, AnimationStrategy.Loop),100);
        const weapon = new Weapon(weaponType,null,engine.weaponCollisionCollideWith);
        engine.currentScene.add(enemy)
        engine.currentScene.add(weapon);
        enemy.pos = engine.screenToWorldCoordinates(new Vector(100*randomIntInRange(-1,1),10));
        weapon.pos = engine.screenToWorldCoordinates(new Vector(100*randomIntInRange(-1.5,1.5),10));
    }
}