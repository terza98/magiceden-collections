//magiceden collection
export const getCollectionFromMagiceden = () => {
  var requestOptions = {
    method: "GET",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/46.0.2490.80", // <---
  };

  fetch(
    'https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=%7B%22$match": {"collectionSymbol": "blockstars"}, "$sort": {"takerAmount": 1, "createdAt": -1}, "$limit": 20}',
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

//howrare is
export const getCollectionFromHowrare = (collection: string) => {
  var requestOptions = {
    method: "GET",
    "Content-Type": "application/json",
  };

  fetch(`https://howrare.is/api/v0.1/collections/${collection}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
