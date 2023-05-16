export class Job 
{
    jobType
    worker
    jobDone
    constructor(jobType)
    {
        this.jobType = jobType;
        this.setJobState(false);
    }
    assignJobWorker(worker)
    {
        this.worker = worker;
    }
    setJobState(state)
    {
        this.jobDone = state;
    }
    execute()
    {
        if(this.worker == null)
        {
            console.log(`${this.jobType} does not have worker assigned`);
            return;
        }
        if(this.worker.hasEnoughResources(this.jobType.resourceCost)){
            this.worker.removeResources(this.jobType.resourceCost)
            this.setJobState(true);
        }
    }

}