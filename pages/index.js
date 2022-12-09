import { useRef, useState } from 'react';
import TimesToBeat from '../components/timesToBeat';
import steamGames from '../data/games.json';

export default function Steam() {
  async function getPrice(appid) {
    try {
      const response = await fetch(`/api/steam/${appid}?currency=US`, {
        method: 'GET',
      });

      const json = await response.json();
      setFormattedPrice(json.final_formatted);
      setPrice(json);
    } catch (error) {
      console.error(error);
    }
  }

  async function getHltbTitles() {
    if (gameTitle.current.value.length < 3) return;
    const response = await fetch(`/api/hltb/${gameTitle.current.value}`, {
      method: 'GET',
    });
    const json = await response.json();
    setHltbOptions(json.response);
    setHltbSelected(json.response[0]);
    setHltbImage(json.response[0].imageUrl);
  }

  async function getSteamTitles() {
    if (gameTitle.current.value.length < 3) return;
    const result = steamGames.filter((obj) => {
      return obj.name
        .toLowerCase()
        .includes(gameTitle.current.value.toLowerCase());
    });
    setSteamOptions(result);
    getPrice(result[0].appid);
    setSteamImage(result[0].appid);
  }
  const [price, setPrice] = useState();
  const [formattedPrice, setFormattedPrice] = useState();
  const [hltbOptions, setHltbOptions] = useState();
  const [hltbSelected, setHltbSelected] = useState();
  const [steamOptions, setSteamOptions] = useState();
  const [steamImage, setSteamImage] = useState();
  const [hltbImage, setHltbImage] = useState();
  const gameTitle = useRef();

  return (
    <div className="flex flex-col-reverse w-full h-screen">
      <div className="flex bg-neutral-700 p-2 gap-2 items-center justify-center">
        <input
          ref={gameTitle}
          className="border-b-2 border-neutral-900 bg-transparent outline-offset-4 px-1 w-full"
        ></input>
        <button
          onClick={() => {
            getHltbTitles();
            getSteamTitles();
          }}
        >
          Find
        </button>
      </div>
      <label className="flex flex-col">
        How long to beat{hltbOptions ? ` (${hltbOptions.length})` : null}:
        <select
          onChange={(event) => {
            setHltbSelected(hltbOptions[event.target.value]);
            setHltbImage(hltbOptions[event.target.value].imageUrl);
          }}
        >
          {hltbOptions
            ? hltbOptions.map((game, index) => (
                <option key={game.id} value={index}>
                  {game.name} ({game.id})
                </option>
              ))
            : null}
        </select>
      </label>
      <label className="flex flex-col">
        Steam{steamOptions ? ` (${steamOptions.length})` : null}:
        <select
          onChange={(event) => {
            getPrice(steamOptions[event.target.value].appid);
            setSteamImage(steamOptions[event.target.value].appid);
          }}
        >
          {steamOptions
            ? steamOptions.map((game, index) => (
                <option key={game.appid} value={index}>
                  {game.name} ({game.appid})
                </option>
              ))
            : null}
        </select>
      </label>
      {formattedPrice ? <p>{formattedPrice}</p> : null}
      {hltbSelected && price ? (
        <TimesToBeat hltbSelected={hltbSelected} price={price} />
      ) : null}
      {steamImage ? (
        <img
          alt=""
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${steamImage}/header.jpg`}
          className=" w-64 p-3 bg-zinc-800 my-3"
        ></img>
      ) : (
        <div className="w-64 aspect-video bg-zinc-800 my-3"></div>
      )}
      {hltbImage ? (
        <img
          alt=""
          src={hltbImage}
          className=" w-64 p-3 bg-zinc-800 my-3"
        ></img>
      ) : (
        <div className="w-64 aspect-video bg-zinc-800 my-3"></div>
      )}
    </div>
  );
}
