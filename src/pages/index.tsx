import {
  Link,
  Text,
  Box,
  InputGroup,
  Input,
  Button,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";

import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { createContext, useEffect, useState } from "react";
import {
  getCollectionFromHowrare,
  getCollectionFromMagiceden,
} from "../api/queries";
import Loading from "../components/Loading";
import { sortByRarity } from "../utils/helpers";
import { TableWithSearch } from "../components/TableWithSearch/TableWithSearch";
import { Listing } from "../types/listing";

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [listings, setListings] = useState([]);
  const [collectionName, setCollectionName] = useState<string>("");

  const searchCollection = (skip: number): void => {
    setPageNumber(skip);
    setLoading(true);
    getCollectionFromHowrare(collectionName).then((howrare) => {
      getCollectionFromMagiceden(collectionName, skip * 20).then(
        (magiceden) => {
          console.log(magiceden);
          console.log(howrare);
          setListings(sortByRarity(howrare?.items, magiceden?.results));
        }
      );
      setLoading(false);
    });
  };

  const listingsContextValue: AppContextInterface = {
    data: listings,
    pageNumber: pageNumber,
    changePage: searchCollection,
  };

  return (
    <Box p={10}>
      <Heading size="lg" mb={10}>
        Collections rarity - returns last 20 listed by rarity descending
      </Heading>
      <InputGroup>
        <Input
          border="1px solid"
          maxW="300px"
          value={collectionName}
          placeholder="Enter collection name: eg. blockstars"
          onChange={(e) => setCollectionName(e.target.value)}
        ></Input>
        <Button onClick={() => searchCollection(0)}>Search</Button>
      </InputGroup>
      <Loading loading={loading} />
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
  changePage: (skip: number) => void;
}

export const ListingsContext = createContext<AppContextInterface | null>(null);

export default Index;
