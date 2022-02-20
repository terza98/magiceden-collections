export interface Listing {
  attributesCount: number;
  nft: {
    name: string;
    rank: number;
    image: string;
  };
  rarestAttribute: {
    name: string;
    value: string;
    rarity: string;
  };
  price: string;
  meUrl: string;
  howrareUrl: string;
  collection: string;
  id: string;
}
