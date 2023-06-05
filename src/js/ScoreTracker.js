export class ScoreTracker
{
    static instance
    score
    constructor() {
        if(ScoreTracker.instance == null)
        {
            ScoreTracker.instance = this;
        }
        this.score = 0;
    }

    addToScore(val)
    {
        this.score+=val;
    }
    getScore()
    {
        return this.score;
    }
    resetScore()
    {
        this.score =0;
    }
}