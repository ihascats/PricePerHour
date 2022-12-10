import { useRef, useState } from 'react';
import GameSelect from '../components/gameSelect';
import Platforms from '../components/platforms';
import TimesToBeat from '../components/timesToBeat';
import steamGames from '../data/games.json';

export default function Steam() {
  async function getPrice(appid, currency) {
    try {
      const response = await fetch(
        `/api/steam/${appid}?currency=${currency === 'EU' ? 'EUR' : currency}`,
      );

      const json = await response.json();
      setPrice(json);
    } catch (error) {
      const obj = {
        currency: 'EUR',
        initial: 0,
        final: 0,
        discount_percent: 0,
        initial_formatted: '',
        final_formatted: 'Free',
      };
      setPrice(obj);
    }
  }

  async function getHltbTitles() {
    if (gameTitle.current.value.length < 3) return;
    const response = await fetch(`/api/hltb/${gameTitle.current.value}`);
    const json = await response.json();
    setHltbOptions(json.response);
    setHltbSelected(json.response[0]);
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
  const [hltbOptions, setHltbOptions] = useState();
  const [hltbSelected, setHltbSelected] = useState();
  const [steamOptions, setSteamOptions] = useState();
  const [steamImage, setSteamImage] = useState();
  const gameTitle = useRef();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col-reverse w-full max-w-[500px] min-h-screen bg-neutral-800 border-x-2 border-neutral-900">
        <div className="flex bg-neutral-900 p-2 gap-2 items-center justify-center sticky bottom-0">
          <input
            ref={gameTitle}
            className="border-b-2 border-neutral-400 text-neutral-400 bg-transparent outline-offset-4 px-1 w-full"
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                getHltbTitles();
                getSteamTitles();
              }
            }}
          ></input>
          <button
            onClick={() => {
              getHltbTitles();
              getSteamTitles();
            }}
            className="text-neutral-400"
          >
            Find
          </button>
        </div>
        <GameSelect
          hltbOptions={hltbOptions}
          steamOptions={steamOptions}
          price={price}
          getPrice={getPrice}
          setSteamImage={setSteamImage}
          setHltbSelected={setHltbSelected}
        />
        {hltbSelected && price ? (
          <TimesToBeat hltbSelected={hltbSelected} price={price} />
        ) : null}
        <Platforms hltbSelected={hltbSelected} />
        {steamImage ? (
          <div className="bg-neutral-800 font-mono text-neutral-50 p-2">
            <p>Steam Image:</p>
            <div className="max-h-[230px] grid justify-center bg-neutral-800">
              <img
                alt=""
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${steamImage}/header.jpg`}
                className=" bg-zinc-800 w-full"
              ></img>
            </div>
          </div>
        ) : null}
        {hltbSelected ? (
          <div className="bg-neutral-800 font-mono text-neutral-50 p-2">
            <p>How Long To Beat Image:</p>
            <div className="max-h-[230px] grid justify-center bg-neutral-800">
              <img
                alt=""
                src={hltbSelected.imageUrl}
                className="bg-zinc-800 max-h-[230px]"
              ></img>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
