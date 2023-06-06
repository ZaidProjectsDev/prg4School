import {Actor, Animation, range, vec, Vector} from "excalibur";

export class WeaponType
{
    weaponGraphic;
    weaponGraphicLeft;
    fireEffect;
    fireRate;
    constructor(weaponGraphic,fireEffect,fireRate) {
        this.fireEffect = fireEffect;
        this.fireRate = fireRate;
        this.weaponGraphic = weaponGraphic.toSprite();
        this.weaponGraphicLeft = weaponGraphic.toSprite();
        this.weaponGraphicLeft.scale = new Vector(-1,1);
    }
}