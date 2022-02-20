import { Box, InputGroup, Input, Button, Heading } from "@chakra-ui/react";

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
  const [howrare, setHowrare] = useState<Array<object>>([]);
  const [collectionName, setCollectionName] = useState<string>("");

  const searchCollection = (skip: number): void => {
    setPageNumber(skip);
    setLoading(true);
    if (howrare.length)
      getCollectionFromMagiceden(collectionName, skip * 20).then(
        (magiceden) => {
          setListings(sortByRarity(howrare, magiceden?.results));
          setLoading(false);
        }
      );
    else
      getCollectionFromHowrare(collectionName).then((howrareListings) => {
        getCollectionFromMagiceden(collectionName, skip * 20).then(
          (magiceden) => {
            setHowrare(howrareListings?.items);
            setListings(
              sortByRarity(howrareListings?.items, magiceden?.results)
            );
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
