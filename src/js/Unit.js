import { ResourceUser } from "./resourceUser";

export class Unit extends ResourceUser
{
    manager
    job 
    constructor (manager,job)
    {
        super();
        this.manager = manager;
        this.job = job;
    }
    doJob()
    {
        //Execute Job
    }
}