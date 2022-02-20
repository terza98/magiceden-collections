import {
  Box,
  Flex,
  InputGroup,
  Input,
  Button,
  Heading,
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

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [listings, setListings] = useState<Array<Listing>>([]);
  const [howrareListings, setHowrareListings] = useState<Array<object>>([]);
  const [howrareCollection, setHowrareCollection] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");

  const searchCollection = (skip: number): void => {
    setPageNumber(skip);
    setLoading(true);
    if (howrareListings.length && howrareCollection === collectionName)
      getCollectionFromMagiceden(collectionName, skip * 20).then(
        (magiceden) => {
          setListings(sortByRarity(howrareListings, magiceden?.results));
          setLoading(false);
        }
      );
    else
      getCollectionFromHowrare(collectionName).then((howrare) => {
        getCollectionFromMagiceden(collectionName, skip * 20).then(
          (magiceden) => {
            setHowrareCollection(howrare?.collection.toLowerCase());
            setHowrareListings(howrare?.items);
            setListings(sortByRarity(howrare?.items, magiceden?.results));
            setLoading(false);
          }
        );
      });
  };

  const listingsContextValue: AppContextInterface = {
    data: listings,
    pageNumber: pageNumber,
    loading: loading,
    changePage: searchCollection,
  };

  return (
    <Box p={10}>
      <Heading size="lg" mb={10} textAlign="center">
        Check your MagicEden collection rarity
      </Heading>
      <InputGroup justifyContent="center">
        <Input
          border="1px solid"
          maxW="300px"
          value={collectionName}
          placeholder="Enter collection name: eg. blockstars"
          onChange={(e) => setCollectionName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchCollection(0)}
        ></Input>
        <Button onClick={() => searchCollection(0)}>Search</Button>
      </InputGroup>
      <ListingsContext.Provider value={listingsContextValue}>
        <TableWithSearch />
      </ListingsContext.Provider>
      <DarkModeSwitch />
    </Box>
  );
};

interface AppContextInterface {
  data: Array<Listing>;
  pageNumber: number;
  loading: boolean;
  changePage: (skip: number) => void;
}

export const ListingsContext = createContext<AppContextInterface | null>(null);

export default Index;
