import { Actor, Color, ScreenElement } from "excalibur";
import { Engine } from "excalibur";
import { Text } from "excalibur";
import { Label } from "excalibur";
import { Font } from "excalibur";
import { FontUnit } from "excalibur";
import { Vector } from "excalibur";
export class PlayerStatsHUD extends ScreenElement
{
    currentPlayer
    currentPlayerHealth
    currentPlayerAmmo
    currentPlayerScore
    label 
    engine
    delta
    player
    constructor(width,height,color,engine,delta)
    {
        super({width:width,height:height,color:color});
        this.engine = engine;
        this.delta = delta;
        this.label = new Label({
            text: 'Some text',
            pos: new Vector(0, 0),
            color:Color.White,
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            })
        });
      this.label.anchor = this.pos;

      this.addChild(this.label)
      
    }
    onInitialize(engine)
    {

    }
    initalizeBaseStats(currentPlayer,currentPlayerHealth,currentPlayerAmmo,currentPlayerScore)
    {
        this.currentPlayer = currentPlayer;
        this.currentPlayerHealth = currentPlayerHealth;
        this.currentPlayerAmmo = currentPlayerAmmo;
        this.currentPlayerScore = currentPlayerScore;
        
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.label.pos = _engine.screenToWorldCoordinates(this.pos);
        this.label.pos= new Vector(  this.label.pos.x+0,  this.label.pos.y+100)
    }

    onPostUpdate(engine, delta) {
        this.label.text= `POS : ${this.player.pos}`


      }
}