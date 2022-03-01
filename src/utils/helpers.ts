import {
  getCollectionFromHowrare,
  getCollectionFromMoonrank,
} from "../api/queries";

function compare(a, b) {
  if (a.nft.rank < b.nft.rank) {
    return -1;
  }
  if (a.nft.rank > b.nft.rank) {
    return 1;
  }
  return 0;
}

export const getId = (meItem) =>
  (meItem.title || meItem.name).split("#")[1]?.trim();

export const sortByRarity = (collectionRanked, collectionMagiceden) => {
  const comparableListings = [];

  collectionMagiceden?.forEach((meItem) => {
    const id = getId(meItem);
    collectionRanked?.forEach((rankedItem) => {
      const attributes = rankedItem.attributes.filter(
        (attribute) => attribute.value !== "None"
      );
      const rarestAttribute = attributes.reduce((prev, curr) =>
        parseFloat(prev.rarity) < parseFloat(curr.rarity) ? prev : curr
      );

      if (rankedItem.id == id)
        comparableListings.push({
          attributesCount: attributes.length,
          nft: {
            name: rankedItem.name,
            rank: rankedItem.rank,
            image: rankedItem.image,
          },
          rarestAttribute: rarestAttribute,
          id: rankedItem.id,
          price: `${meItem.price} SOL`,
          meUrl: `https://magiceden.io/item-details/${meItem.mintAddress}`,
          howrareUrl: rankedItem.link,
          collection: meItem.collectionTitle,
          collectionUrl: `https://magiceden.io/marketplace/${meItem.collectionName}`,
        });
    });
  });
  return comparableListings.sort(compare);
};

export const sortByRarityMoonrank = (
  collection,
  collectionRanked,
  collectionMagiceden
) => {
  const comparableListings = [];

  collectionMagiceden?.forEach((meItem) => {
    const id = getId(meItem);
    collectionRanked?.forEach((rankedItem) => {
      const attributes = rankedItem.rank_explain.filter(
        (attribute) => attribute.value !== ""
      );
      const rarestAttribute = attributes.reduce((prev, curr) =>
        parseFloat(prev.value_perc) < parseFloat(curr.value_perc) ? prev : curr
      );
      const rankedId = rankedItem.name.split("#")[1];
      if (rankedId === id)
        comparableListings.push({
          attributesCount: attributes.length,
          nft: {
            name: rankedItem.name,
            rank: rankedItem.rank,
            image: rankedItem.image,
          },
          rarestAttribute: rarestAttribute,
          id: rankedId,
          price: `${meItem.price} SOL`,
          meUrl: `https://magiceden.io/item-details/${meItem.mintAddress}`,
          moonrankUrl: `https://moonrank.app/collection/${collection}/${rankedItem.mint}`,
          collection: meItem.collectionTitle,
          collectionUrl: `https://magiceden.io/marketplace/${meItem.collectionName}`,
        });
    });
  });
  return comparableListings.sort(compare);
};

export const filterCollections = (query, collections) => {
  return collections.filter(
    (collection) => collection.symbol.indexOf(query.toLowerCase()) > -1
  );
};

export const sortTokensByCollection = async (tokens) => {
  // { collection: "blockstars", tokensArray: [{}] }
  const list = new Map();

  tokens.forEach((token) => {
    const tmp = list.has(token.collection) ? list.get(token.collection) : [];
    tmp.push(token);
    list.set(token.collection, tmp);
  });

  const newList = await sortTokensByRarity(list);

  return newList;
};

export const sortTokensByRarity = async (list) => {
  const newList = list;

  Array.from(newList?.entries()).forEach((collection) => {
    const howrareHandle = collection[0]?.replaceAll("_", "");

    getCollectionFromHowrare(howrareHandle).then((howrare) => {
      if (howrare)
        newList.set(collection[0], sortByRarity(howrare?.items, collection[1]));
      else {
        const collectionSymbol =
          collection[0] === "xin_dragons_gen_2"
            ? "xin_dragons_gen2"
            : collection[0];

        console.log(collectionSymbol);
        collectionSymbol &&
          getCollectionFromMoonrank(collectionSymbol).then((moonrank) => {
            newList.set(
              collection[0],
              sortByRarityMoonrank(
                collection[0],
                moonrank?.mints,
                collection[1]
              )
            );
          });
      }
    });
  });

  return newList;
};
