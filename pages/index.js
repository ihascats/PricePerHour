import { useRef, useState } from 'react';
import GameSelect from '../components/gameSelect';
import Icons from '../components/icons';
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
    setLoading(false);
  }

  async function getSteamTitles() {
    if (gameTitle.current.value.length < 3) return;
    const result = steamGames.filter((obj) => {
      return obj.name
        .toLowerCase()
        .includes(gameTitle.current.value.toLowerCase());
    });
    if (result.length === 0) return;
    setSteamOptions(result);
    getPrice(result[0].appid);
    setSteamImage(result[0].appid);
  }
  const [price, setPrice] = useState();
  const [hltbOptions, setHltbOptions] = useState();
  const [hltbSelected, setHltbSelected] = useState();
  const [steamOptions, setSteamOptions] = useState();
  const [steamImage, setSteamImage] = useState();
  const [loading, setLoading] = useState(false);
  const gameTitle = useRef();
  const icons = Icons();

  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="max-w-[500px] top-0 min-h-screen w-full bg-neutral-600/20 backdrop-blur-md border-x-2 border-neutral-900 flex flex-col text-neutral-400 justify-center items-center fixed">
          {icons.loading}
          <p className="font-mono">Loading game data..</p>
        </div>
      ) : null}
      <div className="flex flex-col-reverse w-full max-w-[500px] min-h-screen bg-neutral-800 border-x-2 border-neutral-900">
        <div className="flex bg-neutral-900 p-2 gap-2 items-center justify-center sticky bottom-0">
          <input
            ref={gameTitle}
            placeholder="At least 3 letters"
            className="border-b-2 border-neutral-400 text-neutral-400 bg-transparent outline-offset-4 px-1 w-full"
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                getHltbTitles();
                getSteamTitles();
                setLoading(true);
              }
            }}
          ></input>
          <button
            onClick={() => {
              getHltbTitles();
              getSteamTitles();
              setLoading(true);
            }}
            className="text-neutral-400"
          >
            {icons.find}
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
