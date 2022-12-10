export default function TimesToBeat({ hltbSelected, price }) {
  const { gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    hltbSelected;
  const { initial, final_formatted } = price;
  return (
    <div className="flex p-2 bg-neutral-800 border-b-2 border-b-neutral-500 text-neutral-50 font-mono">
      <div className="grid grid-cols-3 w-full whitespace-nowrap gap-x-2">
        <p className="text-red-400 w-fit">Main:</p>
        <p className="text-red-400">{gameplayMain}h</p>
        <p className="text-red-400">
          {(initial / (gameplayMain * 100)).toFixed(2)}/h
        </p>

        <p className="text-yellow-400 w-fit">Main+:</p>
        <p className="text-yellow-400">{gameplayMainExtra}h</p>
        <p className="text-yellow-400">
          {(initial / (gameplayMainExtra * 100)).toFixed(2)}/h
        </p>

        <p className="text-green-400 w-fit">100%:</p>
        <p className="text-green-400">{gameplayCompletionist}h</p>
        <p className="text-green-400">
          {(initial / (gameplayCompletionist * 100)).toFixed(2)}/h
        </p>
      </div>
    </div>
  );
}
