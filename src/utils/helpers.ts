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
          price: meItem.price,
          meUrl: `https://magiceden.io/item-details/${meItem.id}`,
          howrareUrl: rankedItem.url,
          collection: meItem.collectionTitle,
        });
    });
  });

  console.log(comparableListings.sort(compare));
  return comparableListings.sort(compare);
};
