import { Setter } from "solid-js";
import Root, { Date, Game } from "./namespace";




export function getDates(root: Root): Date[] {
    return root.dates
}


export function getGameNames(games: Game[]): string[]{
    return games.map((game) => {
        const [home, away] = getTeamNames(game)
        return away + " vs " + home 
    })
}

export function getTeamNames(game: Game): string[] {
    return [game.teams.home.team.name, game.teams.away.team.name]
}

export function setTeams(game: Game, setHome: Setter<string>, setAway: Setter<string>) {
    const [home, away] = getTeamNames(game)
    setHome(home)
    setAway(away)
}

export function getScores(game: Game){
    const home = game.teams.home.score
    const away = game.teams.away.score
    return [home, away]
}

export function setScores(game: Game, setHome: Setter<number>, setAway: Setter<number>){
    const [home, away] = getScores(game)
    setHome(home)
    setAway(away)
}

export function getShots(game: Game){
    const home = game.linescore.teams.home.shotsOnGoal
    const away = game.linescore.teams.away.shotsOnGoal
    return [home, away]
}

export function setShots(game: Game, setHome: Setter<number>, setAway: Setter<number>){
    const [home, away] = getShots(game)
    setHome(home)
    setAway(away)
}

export function getTime(game: Game){
    return game.linescore.currentPeriodTimeRemaining
}

export function setTime(game: Game, setTime: Setter<string>){
    const time = getTime(game)
    setTime(time)
}

export function getPeriod(game: Game){
    return game.linescore.currentPeriodOrdinal
}

export function getRecord(game: Game){
    const recordA = game.teams.away.leagueRecord
    const recordH = game.teams.home.leagueRecord
    return [recordH.wins + "-" + recordH.losses + "-" + recordH.ot,recordA.wins + "-" + recordA.losses + "-" + recordA.ot]
}

export function setRecord(game: Game, setHome: Setter<string>, setAway: Setter<string>){
    const [home, away] = getRecord(game)
    setHome(home)
    setAway(away)
}

export function getVenue(game: Game){
    return game.venue.name
}


export function setScoreMatrix(game: Game, setScoreMatrix: Setter<number[][]>){
    let out: [[number, number, number],[number, number,number]] =[[0,0,0],[0,0,0]]
    const periods = game.linescore.periods
    for(let i = 0; i < periods.length; i++){
        out[1][i] = periods[i].home.goals
        out[0][i] = periods[i].away.goals
    }
    setScoreMatrix(out)
}