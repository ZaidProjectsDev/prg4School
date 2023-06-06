import '../css/style.css'
import {
    Actor,
    Color,
    DisplayMode,
    Engine,
    Vector,
    Scene,
    Resolution,
    CollisionGroupManager,
    CollisionGroup, SpriteSheet, range,Animation
} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {ScoreTracker} from "./ScoreTracker.js";
import { Physics } from 'excalibur'
import { scMainMenu } from './Scenes/scMainMenu'
import { scLevel1 } from './Scenes/scLevel1'
import {scGameOver} from "./Scenes/scGameOver.js";
export class Game extends Engine {

    playerCollisionCollideWith
    weaponCollisionCollideWith
    solidCollision
    weaponCollision
    mainPlayerStatsHud

    fireEffectSpriteSheet;
    fireEffectAnimation;
    scoreTracker;
    constructor() {
        super({ width: 480, height: 320 ,maxFps:60, displayMode: DisplayMode.FitScreen, antialiasing:false, resolution:Resolution.GameBoyAdvance})
        this.scoreTracker = new ScoreTracker();
        Physics.acc = new Vector(0,300);
        this.addScene("scMainMenu", new scMainMenu());
        this.addScene("scLevel1", new scLevel1());
        this.addScene("scGameOver", new scGameOver());
        this.start(ResourceLoader).then(() => this.goToScene('scMainMenu',{engine:this}));
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.solidCollision = CollisionGroupManager.create("solid");
        this.weaponCollision = CollisionGroupManager.create("weapons")
        this.playerCollisionCollideWith = CollisionGroup.collidesWith([
            this.solidCollision,this.weaponCollision
        ])



        this.fireEffectSpriteSheet = SpriteSheet.fromImageSource({
            image:Resources._fireEffect,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 192,
                spriteHeight: 128
            }

        } )

        this.add(this.fireEffectSpriteSheet);
        this.fireEffectAnimation = Animation.fromSpriteSheet( this.fireEffectSpriteSheet,range(0,2),100);
    }
    triggerGameOver()
    {
        this.goToScene('scGameOver',{engine:this});
    }


}

new Game()
