const hltb = require('howlongtobeat');
const hltbService = new hltb.HowLongToBeatService();

export default async function handler(req, res) {
  const { gameTitle } = req.query;

  const response = await hltbService.search(gameTitle);
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send({ game_info: json });
  } else {
    res.send({ response });
  }
}
