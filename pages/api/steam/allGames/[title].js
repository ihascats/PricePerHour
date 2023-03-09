export default async function handler(req, res) {
  const response = await fetch(
    `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json`,
  );
  const { title } = req.query;
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    const arrayAllGames = json.applist.apps;

    // Filter the Steam games array to find matches for the search term
    const steamGameFilter = arrayAllGames.filter((obj) => {
      return obj.name.toLowerCase().includes(title);
    });

    if (steamGameFilter.length === 0) {
      res.send({ arrayGames: [] });
    } else {
      // Sort the filtered Steam games alphabetically by game title
      steamGameFilter.sort((a, b) => a.name.length - b.name.length);
      res.send({ arrayGames: steamGameFilter });
    }
  } else {
    res.send({ response });
  }
}
