export default async function handler(req, res) {
  const { steamId, currency } = req.query;

  const response = await fetch(
    `https://store.steampowered.com/api/appdetails/?appids=${steamId}&cc=${currency}&filters=price_overview`,
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send(json[`${steamId}`].data.price_overview);
  } else {
    res.send({ response });
  }
}
