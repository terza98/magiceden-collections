import {
  Box,
  InputGroup,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { createContext, useState } from "react";
import {
  getCollectionFromHowrare,
  getCollectionFromMagiceden,
} from "../api/queries";
import { sortByRarity } from "../utils/helpers";
import { TableWithSearch } from "../components/TableWithSearch/TableWithSearch";
import { Listing } from "../types/listing";
import { Footer } from "../components/Footer";

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [listings, setListings] = useState<Array<Listing>>([]);
  const [howrareListings, setHowrareListings] = useState<Array<object>>([]);
  const [howrareCollection, setHowrareCollection] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [sortPreference, setSortPreference] = useState<string>("rarity");

  const searchCollection = (skip: number): void => {
    setPageNumber(skip);
    setLoading(true);
    if (howrareListings.length && howrareCollection === collectionName)
      getCollectionFromMagiceden(
        collectionName,
        skip * 20,
        sortPreference
      ).then((magiceden) => {
        setListings(sortByRarity(howrareListings, magiceden?.results));
        setLoading(false);
      });
    else
      getCollectionFromHowrare(collectionName).then((howrare) => {
        getCollectionFromMagiceden(
          collectionName,
          skip * 20,
          sortPreference
        ).then((magiceden) => {
          setHowrareCollection(howrare?.collection);
          setHowrareListings(howrare?.items);
          setListings(sortByRarity(howrare?.items, magiceden?.results));
          setLoading(false);
        });
      });
  };

  const sort = (value: string): void => {
    setSortPreference(value);
    setLoading(true);
    getCollectionFromMagiceden(collectionName, pageNumber * 20, value).then(
      (magiceden) => {
        setListings(sortByRarity(howrareListings, magiceden?.results));
        setLoading(false);
      }
    );
  };

  const listingsContextValue: AppContextInterface = {
    data: listings,
    collectionName: collectionName,
    pageNumber: pageNumber,
    loading: loading,
    changePage: searchCollection,
    sort: sort,
  };

  return (
    <Box p={10}>
      <Heading size="lg" textAlign="center" mb={4}>
        SnipeMe
      </Heading>
      <Text textAlign="center" mb={10}>
        Search for your collection rarity and snipe the most recent NFTs listed
      </Text>
      <InputGroup justifyContent="center">
        <Input
          border="1px solid"
          maxW="300px"
          value={collectionName}
          placeholder="Enter collection name: eg. blockstars"
          onChange={(e) => setCollectionName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchCollection(0)}
        ></Input>
        <Button ml={4} onClick={() => searchCollection(0)}>
          Search
        </Button>
      </InputGroup>
      <ListingsContext.Provider value={listingsContextValue}>
        <TableWithSearch />
      </ListingsContext.Provider>
      <DarkModeSwitch />
      <Footer />
    </Box>
  );
};

interface AppContextInterface {
  data: Array<Listing>;
  collectionName: string;
  pageNumber: number;
  loading: boolean;
  changePage: (skip: number) => void;
  sort: (value: string) => void;
}

export const ListingsContext = createContext<AppContextInterface | null>(null);

export default Index;
