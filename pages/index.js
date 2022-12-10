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
      console.error(error);
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
      <div className="flex flex-col-reverse w-full h-screen max-w-[500px] border-x-2 border-neutral-900">
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
          <img
            alt=""
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${steamImage}/header.jpg`}
            className=" w-64 p-3 bg-zinc-800 my-3"
          ></img>
        ) : (
          <div className="w-64 aspect-video bg-zinc-800 my-3"></div>
        )}
        {hltbSelected ? (
          <img
            alt=""
            src={hltbSelected.imageUrl}
            className=" w-64 p-3 bg-zinc-800 my-3"
          ></img>
        ) : (
          <div className="w-64 aspect-video bg-zinc-800 my-3"></div>
        )}
      </div>
    </div>
  );
}
