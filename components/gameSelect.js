import PriceDisplay from './priceDisplay';

export default function GameSelect({
  hltbOptions,
  steamOptions,
  price,
  getPrice,
  setSteamImage,
  setHltbSelected,
}) {
  return (
    <div className="p-2 bg-neutral-800 text-neutral-400 flex flex-col-reverse gap-3">
      <label className="flex flex-col font-mono text-sm">
        How long to beat{hltbOptions ? ` (${hltbOptions.length})` : null}:
        <select
          onChange={(event) => {
            setHltbSelected(hltbOptions[event.target.value]);
          }}
          className="bg-transparent border-b-2 border-neutral-400 text-neutral-50 font-sans text-base"
        >
          {hltbOptions
            ? hltbOptions.map((game, index) => (
                <option className="bg-neutral-900" key={game.id} value={index}>
                  {game.name} ({game.id})
                </option>
              ))
            : null}
        </select>
      </label>
      <label className="flex flex-col font-mono text-sm">
        Steam{steamOptions ? ` (${steamOptions.length})` : null}:
        <select
          onChange={(event) => {
            getPrice(steamOptions[event.target.value].appid);
            setSteamImage(steamOptions[event.target.value].appid);
          }}
          className="bg-transparent border-b-2 border-neutral-400 text-neutral-50 font-sans text-base"
        >
          {steamOptions
            ? steamOptions.map((game, index) => (
                <option
                  className="bg-neutral-900"
                  key={game.appid}
                  value={index}
                >
                  {game.name} ({game.appid})
                </option>
              ))
            : null}
        </select>
      </label>
      <PriceDisplay price={price} />
    </div>
  );
}
