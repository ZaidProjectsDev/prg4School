import { Actor, Vector } from "excalibur";
export class ResourceUser extends Actor
{
    resources 
    constructor()
    {
        super();
    }
    addResources(addNum)
    {
        this.resources+=addNum;
    }
    removeResources(subNum)
    {
        this.resources-=subNum;
    }
    hasEnoughResources(requiredCount)
    {
        return (this.resources>=requiredCount)
    }
    reportStats()
    {
        
    }
    setPosition(x,y)
    {
      this.pos = new Vector(x,y);
    }
    destroyMe()
    {
        this.kill();
    }
    genericDestroyMessage()
    {
        return `${this.name} was removed from memory`;
    }
    //#region ExActor 
    onInitialize(engine)
    {
        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
        this.on("pointerup", (event) =>{
            this.reportStats();
        })
    }
    onPostKill()
    {
        console.log(this.genericDestroyMessage());
    }
    //#endregion
}