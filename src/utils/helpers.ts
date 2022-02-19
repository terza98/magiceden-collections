function compare(a, b) {
  if (a.rank < b.rank) {
    return -1;
  }
  if (a.rank > b.rank) {
    return 1;
  }
  return 0;
}

export const getId = (meItem) => meItem.title.split("#")[1].trim();

export const sortByRarity = (collectionRanked, collectionMagiceden) => {
  const comparableListings = [];

  collectionMagiceden.forEach((meItem) => {
    const id = getId(meItem);
    collectionRanked.forEach((rankedItem) => {
      if (rankedItem.id == id) comparableListings.push(rankedItem);
    });
  });

  console.log(comparableListings.sort(compare));
  return comparableListings.sort(compare);
};
