import {Scene, Vector} from "excalibur";
import {Button} from "../Generics/Button.js";
import {ScoreTracker} from "../ScoreTracker.js";


export class scGameOver extends Scene
{
    restartButton
    scoreCount
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.centerScreen = new Vector(_engine.drawWidth/2, _engine.drawHeight/2);
        this.restartButton = new Button("Restart", this.centerScreen);
        this.scoreCount = new Button("Score :", new Vector(this.centerScreen.x, this.centerScreen.y+50))
      _engine.add(this.restartButton);
        _engine.add(this.scoreCount);
        this.restartButton.on('pointerup',function(ev){
            ScoreTracker.instance.resetScore();
            _engine.goToScene('scMainMenu');
        });
    }
    onActivate(_context) {
        super.onActivate(_context);
        this.scoreCount.label.text ="Score :"+ ScoreTracker.instance.getScore();
    }


}