import axios from "axios";

//magiceden collection
export const getCollectionFromMagiceden = async (
  collection: string,
  skip = 0,
  sortPreference: string
) => {
  try {
    const priceAsc = sortPreference === "price";
    const response = await axios.get(
      `https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=%7B%22$match": {"collectionSymbol": "${collection.toLowerCase()}"}, "$sort": { ${
        priceAsc ? `"takerAmount": 1,` : ``
      } "createdAt": -1}, "$skip": ${skip}, "$limit": 20}`
    );
    if (response) return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

//howrare is
export const getCollectionFromHowrare = async (collection: string) => {
  try {
    const response = await axios.get(
      `https://howrare.is/api/v0.1/collections/${collection.toLowerCase()}`
    );
    if (response) return response.data.result.data;
  } catch (error) {
    console.log("error", error);
  }
};

// all from magiceden
export const allCollectionsFromMagiceden = async () => {
  try {
    const response = await axios.get(
      `https://api-mainnet.magiceden.io/all_collections`
    );
    console.log(response.data.collections);
    if (response) return response.data.collections;
  } catch (error) {
    console.log("error", error);
  }
};

//moonrank

export const getCollectionFromMoonrank = async (collection: string) => {
  try {
    const response = await axios.get(
      `https://proxy-server-magiceden.herokuapp.com/https://moonrank.app/mints/xin_dragons_gen2`
    );
    console.log(response.data);
    if (response) return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
