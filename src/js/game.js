import '../css/style.css'
import { Actor, Color, DisplayMode, Engine, Vector,Scene, Resolution } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { ResourceUser } from './resourceUser'
import { Player } from './Player'
import { Job } from './Job'
import { JobType } from './JobType'
import { jobTable } from './JobTable'
import {SelectableItemTable} from './SelectableItemTable.js'
import { PlayerStatsHUD } from './PlayerStatsHUD.js'
import { BipedPlayer } from './BipedPlayer'
import { Physics } from 'excalibur'
import { Stats } from './GameCore'
import { Interactable } from './Interactable'
import { scMainMenu } from './Scenes/scMainMenu'
import { scLevel1 } from './Scenes/scLevel1'
export class Game extends Engine {


  mainPlayerStatsHud
    constructor() {
        super({ width: 480, height: 320 ,maxFps:30, displayMode: DisplayMode.FitScreen, resolution:Resolution.GameBoyAdvance})
        Physics.useRealisticPhysics();
        Physics.acc = new Vector(0,300);
        this.addScene("scMainMenu", new scMainMenu());
        this.addScene("scLevel1", new scLevel1());
        this.start(ResourceLoader).then(() => this.goToScene('scMainMenu',{engine:this}));
    }

    startManagerGame()
    {
        console.log("starting manager game");
        this.mainPlayerStatsHud = new PlayerStatsHUD(1280,64,new Color(0.15,0.15,0.15,1));
        this.mainPlayerStatsHud.initalizeBaseStats(null,20,25,300);
        this.mainPlayerStatsHud.pos = new Vector(25,25);
        this.add(this.mainPlayerStatsHud);

        let jobs = jobTable.getJobs();

      for(let i=0; i<jobs.length; ++i)
      {
        console.log(jobs[i]);
      }

        const player = new BipedPlayer();
        player.isMainPlayer = true;
        player.initalizeStats(150,150,15,20);
        player.graphics.use(Resources.Fish.toSprite());
       // player.setPosition(200,200);
       // player.spawnNewUnit(jobTable.getAccountantJob())


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
