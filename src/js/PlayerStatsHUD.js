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

      
    }
    onInitialize(engine)
    {
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
        
        this.engine.add(this.label);
    }
    initalizeBaseStats(currentPlayer,currentPlayerHealth,currentPlayerAmmo,currentPlayerScore)
    {
        this.currentPlayer = currentPlayer;
        this.currentPlayerHealth = currentPlayerHealth;
        this.currentPlayerAmmo = currentPlayerAmmo;
        this.currentPlayerScore = currentPlayerScore;
        
    }
    onPostUpdate(engine, delta) {
        this.label.text= `POS : ${this.player.pos}`
      
      }
      onPreUpdate()
      {
    
      }
}