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
      if (rankedItem.id == id)
        comparableListings.push({
          nft: {
            name: rankedItem.name,
            rank: rankedItem.rank,
            image: rankedItem.image,
          },
          id: rankedItem.id,
          price: meItem.price,
          meUrl: `https://magiceden.io/item-details/${meItem.mintAddress}`,
          howrareUrl: rankedItem.link,
          collection: meItem.collectionTitle,
          collectionUrl: `https://magiceden.io/marketplace/${meItem.collectionName}`,
        });
    });
  });

  console.log(comparableListings.sort(compare));
  return comparableListings.sort(compare);
};
