import { Component, createEffect, createResource, createSignal, Setter } from "solid-js";
import Root, { Game } from "./namespace"
import { Date } from './namespace';
import { getDates, getGameNames } from './DataHandler';

const fetchData = async () => {
    return (await fetch('https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore')
    .then(r => r.json())
    .then(r => {
        console.log(r)
        return getDates(r)[0].games[0]
    })
    )
}

function getHomeScore(game: Game){
    return game.teams.home.score
}

export const Scoreboard: Component<{game: Game | undefined}> = (props) => {
    if (typeof props.game === "undefined"){
        return(
            <div>Undefined</div>
        )
    }
    const [game] = createSignal<Game>(props.game)
    createEffect(() =>{
        console.log(game())
    })
    const [homeScore, setHomeScore] = createSignal()
    

    return(
        <div>
            <p>Home: {game()?.teams.home.team.name}</p>
            {game()?.teams.home.score}
            <p>Away: {game()?.teams.away.team.name}</p>
            {game()?.teams.away.score}
        </div>
    )
}


function validGame(game: any){
    return game as Game
}

function getCurrentGame(setGame: Setter<Game>) {
    
}
