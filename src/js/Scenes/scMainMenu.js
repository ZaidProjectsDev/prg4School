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
    range,
    Animation,
    vec
} from "excalibur"
import { Button } from "../Generics/Button";
import { Resources } from "../resources";
export class scMainMenu extends Scene
{
    title
    startButton
    optionButton
    centerScreen
    onInitialize(engine)
    {
       // engine.showDebug(true);
        console.log("Main Menu Initalized");
        this.centerScreen = new Vector(engine.drawWidth/2, engine.drawHeight/2);
        Physics.gravity = new Vector(0,0);
        this.makeTitleCard(engine)
        const test =  Animation.fromSpriteSheet( engine.fireEffectSpriteSheet,range(0,2),100);
        const testActor = new Actor({pos: vec(engine.halfDrawWidth, engine.halfDrawHeight)})
        testActor.graphics.use(test);
        this.add(testActor);
        this.startButton = new Button("Start Game", this.centerScreen);
        this.optionButton = new Button("Options", new Vector(this.centerScreen.x,this.centerScreen.y*1.4));

        this.startButton.pos = new Vector(this.centerScreen.x-this.startButton.width, this.centerScreen.y-this.startButton.height)
         this.startButton.scale = new Vector(0.5,0.5);
         this.optionButton.scale = new Vector(0.5,0.5);
        this.add(this.startButton);
        this.add(this.optionButton);

        this.startButton.on('pointerup',function(ev){
            engine.goToScene('scLevel1');
        });
    }
    makeTitleCard()
    {

        let asset = Resources.t512x256Title;
        this.title = new Actor({
            width:asset.width,
            height:asset.height,
            scale : new Vector(0.25,0.25)})
            this.title.graphics.use(asset.toSprite());
            this.title.pos = new Vector(this.centerScreen.x,this.centerScreen.y*0.4)
           this.engine.add(this.title);
    }
}