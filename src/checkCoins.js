async function getTopCoins() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&order=market_cap_desc" +
    "&per_page=150" +
    "&page=1" +
    "&sparkline=false";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

function sortByMovement(coins) {
  return coins.sort(
    (a, b) =>
      Math.abs(b.price_change_percentage_24h) -
      Math.abs(a.price_change_percentage_24h)
  );
}

function printCoins(coins) {
  console.log("Top 150 coins price changes:\n");

  coins.slice(0, 20).forEach((coin, index) => {
    console.log(
      `${index + 1}. ${coin.symbol.toUpperCase()} | ${coin.name} | $${coin.current_price} | ${coin.price_change_percentage_24h}%`
    );
  });
}

async function main() {
  try {
    const coins = await getTopCoins();
    const sortedCoins = sortByMovement(coins);
    printCoins(sortedCoins);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
