class JobTable {
    jobs
    constructor(){
        console.log("created the jobtable")
        this.jobs = ["lumberjack", "secretary", "it-specialist"]
    }
    getJobs(){
        return this.jobs
    }
    addJob(str){
        this.jobs.push(str)
    }
    getJob(id)
    {
        for(let i=0; i<this.jobs.length; ++i)
        {
            if(this.jobs[i].id == id)
            {
                return this.jobs[i];
                
            }
        }
    }
}

export const jobTable = new JobTable()