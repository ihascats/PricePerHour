export default async function handler(req, res) {
  const { currency } = req.query;

  const response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.json`,
  );
  if (response.status === 200) {
    const json = await response.json(); //extract JSON from the http response
    res.send(json);
  } else {
    res.send({ response });
  }
}
