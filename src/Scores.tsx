import { Component, createResource, createSignal } from "solid-js";
import {
  getDates,
  setScores,
  setTeams,
  setShots,
  setTime,
  getPeriod,
  setRecord,
} from "./DataHandler";
import Root, { Game } from "./namespace";
import { Scoreboard } from "./Scoreboard";
import styles from "./App.module.css";
import { Table } from "solid-bootstrap";
import { getVenue, setScoreMatrix } from './DataHandler';
import { Venue } from './namespace';

const fetchData = async () => {
  return await fetch(
    "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore"
  )
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      return getDates(r)[0].games;
    });
};

async function awaitGame() {
  return (
    await fetch(
      "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore"
    )
  ).json();
}

export const Scores: Component<{ game: Promise<Game> }> = (props) => {
  const [gameList] = createResource<Game[]>(fetchData);
  const [homeTeam, setHomeTeam] = createSignal<string>();
  const [awayTeam, setAwayTeam] = createSignal<string>();

  const [homeScore, setHomeScore] = createSignal<number>();
  const [awayScore, setAwayScore] = createSignal<number>();

  const [homeShots, setHomeShots] = createSignal<number>();
  const [awayShots, setAwayShots] = createSignal<number>();

  const [time, setTimecurr] = createSignal<string>();
  const [period, setCurrentPeriod] = createSignal<string>();

  const [homeRecord, setHomeRecord] = createSignal<string>();
  const [awayRecord, setAwayRecord] = createSignal<string>();

  const [venue, setVenue] = createSignal<string>()
  const [scoreMatrix, setScoreM] = createSignal<number[][]>()


  props.game.then((r) => {
    setTeams(r, setHomeTeam, setAwayTeam);
    setScores(r, setHomeScore, setAwayScore);
    setShots(r, setHomeShots, setAwayShots);
    setTime(r, setTimecurr);
    setCurrentPeriod(getPeriod(r));
    setRecord(r, setHomeRecord, setAwayRecord)
    setVenue(getVenue(r))
    setScoreMatrix(r, setScoreM)
  });

  return (
    <div class="mx-auto my-2 max-w-md rounded overflow-hidden shadow-md text-xs">
      <div class="flex bg-gray-200 px-2 py-2">
        <div class="w-5/12 text-gray-700 text-left text-red-700">
          {time()} - {period()}
        </div>
        <div class="w-5/12 flex justify-end items-center">
          <p class="w-8 px-2 text-center">1</p>
          <p class="w-8 px-2 text-center">2</p>
          <p class="w-8 px-2 text-center">3</p>
        </div>
        <div class="w-1/6 text-gray-700 text-right">Score</div>
      </div>

      <div class="flex px-2 py-2 items-center">
        <div class="w-5/12 flex">
          <div class="flex flex-col">
            <p class="text-sm font-bold">{awayTeam()}</p>
            <p>{awayShots()} SOG</p>
            <p class="hidden sm:block text-gray-600">{awayRecord()}</p>
          </div>
        </div>
        <div class="w-5/12 flex justify-end items-center">
            <p class="w-8 px-1 text-center">{scoreMatrix()?.at(0)?.at(0)}</p>
            <p class="w-8 px-1 text-center">{scoreMatrix()?.at(0)?.at(1)}</p>
            <p class="w-8 px-1 text-center">{scoreMatrix()?.at(0)?.at(2)}</p>
        </div>
        <p class="w-1/6 text-lg sm:text-xl font-bold text-right">{awayScore()}</p>
      </div>

      <div class="flex px-2 py-2 items-center">
        <div class="w-5/12 flex">
          <div class="flex flex-col">
            <p class="text-sm font-bold">{homeTeam()}</p>
            <p>{homeShots()}</p>
            <p class="hidden sm:block text-gray-600">{homeRecord()}</p>
          </div>
        </div>
        <div class="w-5/12 flex justify-end items-center">
          <p class="w-8 px-1 text-center">{scoreMatrix()?.at(1)?.at(0)}</p>
          <p class="w-8 px-1 text-center">{scoreMatrix()?.at(1)?.at(1)}</p>
          <p class="w-8 px-1 text-center">{scoreMatrix()?.at(1)?.at(2)}</p>
        </div>
        <p class="w-1/6 text-lg sm:text-xl font-bold text-right">{homeScore()}</p>
      </div>


      <div class="flex border-t bg-gray-200">
        <div class="w-1/2 px-2 py-2 text-left">
          <p class="font-semibold text-gray-700">{venue}</p>
        </div>
      </div>
    </div>
  );
};
