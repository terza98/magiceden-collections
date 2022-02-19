import axios from "axios";

//magiceden collection
export const getCollectionFromMagiceden = async (
  collection: string,
  skip: number = 0
) => {
  try {
    //"takerAmount": 1,
    const response = await axios.get(
      `https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=%7B%22$match": {"collectionSymbol": "${collection.toLowerCase()}"}, "$sort": { "createdAt": -1}, "$skip": ${skip}, "$limit": 20}`
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
