import { Actor, BaseAlign, Color, Font, FontUnit, Label, TextAlign, Vector } from "excalibur";
import { Resources } from "../resources";
export class Button extends Actor {
  label;
  backgroundImage;
  text;
  constructor(text, pos) {
    super({
      pos: pos,
    });
    this.text = text;
  }

  onInitialize(engine) {
    this.createBackgroundImage()
    this.createDefaultLabel(engine);

    this.addClickEvent()
  }
  
  addClickEvent() {
    // enable propagating pointer events
    this.pointer.useGraphicsBounds = true;
    this.enableCapturePointer = true;
    //  .enableCapturePointer = true
    // enable move events, warning: performance intensive!
    this.captureMoveEvents = true;
    // subscribe to input
    this.on("pointerup", function (ev) {
      console.log("BUTTON SELECTED");
    });
  }
  createBackgroundImage() {
    let asset = Resources.b128x32Button.toSprite();

    // this.backgroundImage = new Actor({
    //   width: asset.width,
    //   height: asset.height,
    // });

    this.graphics.use(asset);

    // this.addChild(this.backgroundImage);
  }
  createDefaultLabel(engine) {
    this.label = new Label({
      text: this.text,
    //   width: this.backgroundImage.width,
    //   height: this.backgroundImage.height,
    //     textAlign: TextAlign.Center,
    //     baseAlign: BaseAlign.Middle,
     pos: new Vector(-64, 16),
      color: Color.Black,
      font: new Font({
        family: "impact",
        size: 24,
        unit: FontUnit.Px,
      }),
    });
    this.addChild(this.label);
    // if (this.backgroundImage != null) {
    //   this.backgroundImage.addChild(this.label);
    // }
  }
}
