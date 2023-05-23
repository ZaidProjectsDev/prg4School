export class Stats {
    health
    ammo 
    moveSpeed
    jumpVelocity
    constructor(health,moveSpeed,jumpVelocity,ammo)
    {
        this.health = health
        this.moveSpeed = moveSpeed;
        this.jumpVelocity =jumpVelocity;
        this.ammo = ammo;
    }
    setGenericValues()
    {
        this.health = 5;
        this.moveSpeed =8;
        this.jumpVelocity = 4;
        this.ammo =10;
    }
    isDead()
    {
        return(this.health<1)
    }

}
export const DamageType = {GENERIC :1, PUNCH :2, PROJECTILE:3 ,EXPLOSION:4
}