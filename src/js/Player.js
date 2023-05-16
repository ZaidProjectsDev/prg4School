import { ResourceUser } from "./resourceUser";

import { jobTable } from "./JobTable"

import { Unit } from "./Unit";
import { Job } from "./Job";
import { Debug } from "excalibur";
export class Player extends ResourceUser
{
    units;
    constructor(ownResources)
    {
        super();
        this.resources = ownResources;
        this.units = new Array();
        this.on('pointerup',()=> this.spawnNewUnit(jobTable.getJob("lumberjack")))
    }
    spawnNewUnit(job)
    {
        let newUnit = new Unit(this,job);
        this.units.push(newUnit);

        console.log(`Player has ${this.units.length} now.`)
    }
    removeUnit(unit)
    {
        //Smells bad, find better solution
        let remove;
        for(let i=0; i<this.units.length; ++i)
        {
            if(this.units[i] == unit)
            {
                remove = this.units[i];
                break;
            }
        }
        if(remove!= null)
        this.units = this.units.filter(item=> item !== remove)
        
        unit.destroyMe();

        console.log(`Player has ${this.units.length} now.`)
    }
    /*
    constructor() {
        console.log(jobTable.getJobs())
    }
    */
}