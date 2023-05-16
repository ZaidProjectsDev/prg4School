export class JobType
{
    id 
    resourceCost 
    resourceReward
    displayName
    constructor(id, resourceCost)
    {
        this.id = id;
        this.resourceCost = resourceCost;
    }
    assignValuesToJob(jobName,cost,reward,displayName)
    {
        this.id = jobName;
        this.resourceCost = cost;
        this.resourceReward = reward;
        this.displayName = displayName;
    }
    getDisplayName()
    {
        return this.displayName;
    }
    getResourceCost()
    {
        return this.resourceCost;
    }
    getResourceReward()
    {
        return this.resourceReward;
    }
    getJobId()
    {
        return this.id;
    }
}