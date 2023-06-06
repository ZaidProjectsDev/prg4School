import { Actor, Color, ScreenElement } from "excalibur";
import { Engine } from "excalibur";
import { Text } from "excalibur";
import { Label } from "excalibur";
import { Font } from "excalibur";
import { FontUnit } from "excalibur";
import { Vector } from "excalibur";
import {ScoreTracker} from "./ScoreTracker.js";
export class PlayerStatsHUD extends ScreenElement
{
    currentPlayer
    currentPlayerHealth
    currentPlayerAmmo
    currentPlayerScore
    label
    scoreLabel
    engine
    delta
    player
    shakeVal;
    shakeValTimeScale ;
    shakeText = false;
    constructor() {
        super();
        this.shakeVal = 0;
        this.shakeValTimeScale = 0;
    }
    onInitialize(engine)
    {
        this.label = new Label({
            text: 'Some text',
            pos: new Vector(100,100),
            color:Color.White,
            font: new Font({
                family: 'impact',
                size: 64,
                unit: FontUnit.Px
            })
        });
        this.scoreLabel = new Label({
            text: 'Some text',
            pos: new Vector(100,25),
            color:Color.White,
            font: new Font({
                family: 'impact',
                size: 48,
                unit: FontUnit.Px
            })
        });
        this.addChild(this.label)
        this.addChild(this.scoreLabel)

    }
    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }


    update(engine)
    {
        super.update(engine)
        this.label.pos = engine.screenToWorldCoordinates(new Vector(30,150));
        this.scoreLabel.pos = engine.screenToWorldCoordinates(new Vector(30,25+this.shakeVal));

            if (engine.currentScene.player.attackedSomethingSuccessfully) {
                this.shakeText = true;
                this.shakeValTimeScale+=100;
            }

    }
    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

     //   this.label.pos = _engine.screenToWorldCoordinates(this.pos);
      //  this.label.pos= new Vector(  this.label.pos.x+0,  this.label.pos.y+100)
    }

    onPostUpdate(engine, delta) {

        if(engine.currentScene.player) {
            this.label.text = "HP : " + engine.currentScene.player.health.toString();
            this.scoreLabel.text = "PTS : " + ScoreTracker.instance.getScore().toString();

            if (this.shakeText) {
                this.shakeValTimeScale += engine.timescale;
                if (this.shakeValTimeScale > 1) {
                    this.shakeValTimeScale = 0;
                    this.shakeText = false;
                }
            }
            console.log(this.shakeValTimeScale);
            this.shakeVal = this.lerp(1, 0, this.shakeValTimeScale / 1);
        }

      }
}