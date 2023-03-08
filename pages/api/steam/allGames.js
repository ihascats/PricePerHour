export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  const response = await fetch(
    `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json`,
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send(json.applist.apps);
  } else {
    res.send({ response });
  }
}
