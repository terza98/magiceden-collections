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

  const [listings, setListings] = useState([]);
  const [collectionName, setCollectionName] = useState<string>("");

  // useEffect(() => {
  //   getCollectionFromMagiceden("blockstars");
  // }, []);
  const searchCollection = (): void => {
    setLoading(true);
    getCollectionFromHowrare(collectionName).then((howrare) => {
      getCollectionFromMagiceden(collectionName).then((magiceden) => {
        console.log(magiceden);
        console.log(howrare);
        setListings(sortByRarity(howrare.items, magiceden.results));
      });
      setLoading(false);
    });
  };

  const listingsContextValue: AppContextInterface = {
    data: listings,
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
        <Button onClick={searchCollection}>Search</Button>
      </InputGroup>
      <Loading loading={loading} />
      <ListingsContext.Provider value={listingsContextValue}>
        <TableWithSearch />
      </ListingsContext.Provider>
      <Flex flexDir="column" mt={10}>
        {listings.map((item) => (
          <Flex key={item.id}>
            <Text>{item.id}</Text>
            <Image src={item.image} width="150px" height="150px" />
            <Text>{item.price}</Text>
          </Flex>
        ))}
      </Flex>
      <DarkModeSwitch />
    </Box>
  );
};

interface AppContextInterface {
  data: Array<Listing>;
}

export const ListingsContext = createContext<AppContextInterface | null>(null);

export default Index;
