import { Component, onCleanup, Setter } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Scoreboard } from './Scoreboard';
import { Scores } from './Scores';
import { getDates } from './DataHandler';
import { createSignal } from 'solid-js';
import { Game } from './namespace';

const App: Component = () => {
  const [gameList, setGameList] = createSignal<Game[]>()
  fetchData().then(setGameList)
  return (
    <div class='font-bold'>
      {gameList()?.map(function(game, index){
        return (
          <div class='pt-2 bg-red-200 border-2'>
            <Scores game={Promise.resolve(game)} />
          </div>
        )
      })}
      <button onClick={() => fetchData().then(setGameList)}>refresh</button>
    </div>
  );
};

const fetchData = async () => {
  return (await fetch(API_PATH + TODAYS_GAMES)
  .then(r => r.json())
  .then(r => getDates(r)[0].games)
  )
}

const API_PATH = 'https://statsapi.web.nhl.com/api/v1/'
const TODAYS_GAMES = 'schedule?expand=schedule.linescore'
const TESTURL = 'schedule?date=2018-01-09'

export default App;
