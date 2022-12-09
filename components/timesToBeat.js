export default function TimesToBeat({ hltbSelected, price }) {
  const { gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    hltbSelected;
  const { initial, final_formatted } = price;
  return (
    <div className="grid grid-cols-2">
      <p>Main: {gameplayMain}h</p>
      <p>
        PPH: {final_formatted[0]}
        {(initial / (gameplayMain * 100)).toFixed(2)}
      </p>
      <p>Main + Extra: {gameplayMainExtra}h</p>
      <p>
        PPH: {final_formatted[0]}
        {(initial / (gameplayMainExtra * 100)).toFixed(2)}
      </p>
      <p>Completionist: {hltbSelected.gameplayCompletionist}h</p>
      <p>
        PPH: {final_formatted[0]}
        {(initial / (gameplayCompletionist * 100)).toFixed(2)}
      </p>
    </div>
  );
}
