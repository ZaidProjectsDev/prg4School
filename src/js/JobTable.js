import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Resources, ResourceLoader } from './resources.js'
import { Job } from './Job.js';
import { JobType } from './JobType.js';
class JobTable {
    jobs
    constructor(){
        this.jobs = new Array();
        this.setUpJobs();
        console.log("created the jobtable")

    }
    setUpJobs()
    {
        let table =  Resources.JobTableList.path;
        for(let i=0; i<table.length; ++i)
        {
            let parsedJob = table[i];
          let newJob = new JobType();
          newJob.assignValuesToJob(parsedJob['jobName'],parsedJob['cost'], parsedJob['reward'], parsedJob['displayName']);
          console.log(newJob);
          this.jobs.push(newJob);
        }
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