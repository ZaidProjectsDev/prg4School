import {PlayerCharacter} from "./PlayerCharacter.js";

export class EnemyCharacter extends PlayerCharacter
{
onPreUpdate() {
    super.onPreUpdate();
    if(!this.isMain)
    {
        if(this.grounded)
        {
            if(this.canDoRandomThing) {
                this.randomJump();
                this.randomFireWeapon();
                this.canDoRandomThing = false;
            }

        }
    }
}
}