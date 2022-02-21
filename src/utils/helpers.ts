function compare(a, b) {
  if (a.nft.rank < b.nft.rank) {
    return -1;
  }
  if (a.nft.rank > b.nft.rank) {
    return 1;
  }
  return 0;
}

export const getId = (meItem) => meItem.title.split("#")[1].trim();

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
