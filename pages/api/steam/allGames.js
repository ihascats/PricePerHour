const fs = require('fs');

export default async function handler(req, res) {
  const response = await fetch(
    `http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json`,
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send(await saveData(json.applist.apps));
  } else {
    res.send({ response });
  }
}

function saveData(games) {
  fs.writeFileSync('data/games.json', JSON.stringify(games));
  return 'Finished';
}
