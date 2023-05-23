import { Actor, Color } from "excalibur";
import { Engine } from "excalibur";
import { Text } from "excalibur";
import { Label } from "excalibur";
import { Font } from "excalibur";
import { FontUnit } from "excalibur";
import { Vector } from "excalibur";
export class PlayerStatsHUD extends Actor
{
    currentPlayer
    currentPlayerHealth
    currentPlayerAmmo
    currentPlayerScore
    label 
    engine
    delta
    constructor(width,height,color,engine,delta)
    {
        super({width:width,height:height,color:color});
        this.engine = engine;
        this.delta = delta;
    }
    initalizeBaseStats(currentPlayer,currentPlayerHealth,currentPlayerAmmo,currentPlayerScore)
    {
        this.currentPlayer = currentPlayer;
        this.currentPlayerHealth = currentPlayerHealth;
        this.currentPlayerAmmo = currentPlayerAmmo;
        this.currentPlayerScore = currentPlayerScore;
        
        this.label = new Label({
            text: 'Some text',
            pos: new Vector(0, 0),color:Color.White,
            anchor : new Vector(0,this.height/2),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            })
        });
        
        this.addChild(this.label);
    }
    onPostUpdate(engine, delta) {
        this.label.text= ` HP :${this.currentPlayerHealth} AMMO :${this.currentPlayerAmmo} SCORE :${this.currentPlayerScore}`
      }
      onPreUpdate()
      {
        
      }
}