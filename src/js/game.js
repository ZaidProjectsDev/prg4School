import '../css/style.css'
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { ResourceUser } from './resourceUser'
import { Player } from './Player'
import { Job } from './Job'
import { JobType } from './JobType'
import { jobTable } from './JobTable'
export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startManagerGame())
    }
    startManagerGame()
    {
        console.log("starting manager game");

        let jobs = jobTable.getJobs();

      for(let i=0; i<jobs.length; ++i)
      {
        console.log(jobs[i]);
      }

        const player = new Player(150);
        player.graphics.use(Resources.Fish.toSprite());
        player.setPosition(200,200);
        player.spawnNewUnit(new Job(new JobType))


        this.add(player);
        
    }
    startGame() {
        console.log("start de game!")
        const fish = new Actor()
        fish.graphics.use(Resources.Fish.toSprite())
        fish.pos = new Vector(400, 300)
        fish.vel = new Vector(-10,0)
        this.add(fish)
    }
}

new Game()
