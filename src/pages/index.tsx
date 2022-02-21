import { Box, InputGroup, Input, Heading, Text } from "@chakra-ui/react";

import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { createContext, useEffect, useState } from "react";
import {
  allCollectionsFromMagiceden,
  getCollectionFromHowrare,
  getCollectionFromMagiceden,
  getCollectionFromMoonrank,
} from "../api/queries";
import {
  filterCollections,
  sortByRarity,
  sortByRarityMoonrank,
} from "../utils/helpers";
import { TableWithSearch } from "../components/TableWithSearch/TableWithSearch";
import { Listing } from "../types/listing";
import { Footer } from "../components/Footer";
import { CollectionInfo, FilteredCollection } from "../types/collection";
import { Autocomplete } from "../components/Autocomplete";

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [listings, setListings] = useState<Array<Listing>>([]);
  const [howrareListings, setHowrareListings] = useState<Array<object>>([]);
  const [howrareCollection, setHowrareCollection] = useState<string>("");
  const [collectionSymbol, setCollectionSymbol] = useState<string>("");
  const [sortPreference, setSortPreference] = useState<string>("rarity");
  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>();

  const [allCollections, setAllCollections] = useState<Array<object>>([]);
  const [filteredCollections, setFilteredCollections] = useState<
    Array<FilteredCollection>
  >([]);

  useEffect(() => {
    allCollectionsFromMagiceden().then((response) => {
      setAllCollections(response);
    });
  }, []);

  const searchCollection = (skip: number, collectionSymbol: string): void => {
    const howrareHandle = collectionSymbol.replaceAll("_", "");
    setCollectionSymbol(collectionSymbol);
    setPageNumber(skip);
    setLoading(true);

    setFilteredCollections([]);
    if (howrareListings?.length && howrareCollection === collectionSymbol)
      getCollectionFromMagiceden(
        collectionSymbol,
        skip * 20,
        sortPreference
      ).then((magiceden) => {
        setListings(sortByRarity(howrareListings, magiceden?.results));
        setLoading(false);
      });
    else
      getCollectionFromHowrare(howrareHandle).then((howrare) => {
        if (howrare)
          getCollectionFromMagiceden(
            collectionSymbol,
            skip * 20,
            sortPreference
          ).then((magiceden) => {
            setHowrareCollection(howrare?.collection);
            setHowrareListings(howrare?.items);
            if (howrare)
              setCollectionInfo({
                twitter: howrare.twitter ?? "",
                website: howrare.website ?? "",
                logo: howrare.logo ?? "",
                howrare: howrare.ranking_url ?? "",
                discord: howrare.discord ?? "",
                description: howrare.description ?? "",
                name: howrare.collection ?? "",
              });
            console.log(howrare);
            setListings(sortByRarity(howrare?.items, magiceden?.results));
            setLoading(false);
          });
        else {
          //fix xin baby symbol
          const collectionToSearch =
            collectionSymbol === "xin_dragons_gen_2"
              ? "xin_dragons_gen2"
              : collectionSymbol;
          getCollectionFromMoonrank(collectionToSearch).then((moonrank) => {
            getCollectionFromMagiceden(
              collectionSymbol,
              skip * 20,
              sortPreference
            ).then((magiceden) => {
              setListings(
                sortByRarityMoonrank(
                  collectionToSearch,
                  moonrank.mints,
                  magiceden?.results
                )
              );
              setLoading(false);
            });
          });
        }
      });
  };

  const sort = (value: string): void => {
    setSortPreference(value);
    setLoading(true);
    getCollectionFromMagiceden(collectionSymbol, pageNumber * 20, value).then(
      (magiceden) => {
        setListings(sortByRarity(howrareListings, magiceden?.results));
        setLoading(false);
      }
    );
  };

  const listingsContextValue: AppContextInterface = {
    data: listings,
    collectionSymbol: collectionSymbol,
    collectionInfo: collectionInfo,
    pageNumber: pageNumber,
    loading: loading,
    changePage: searchCollection,
    sort: sort,
  };

  const handleSearch = (query) => {
    setCollectionSymbol(query);
    query === ""
      ? setFilteredCollections([])
      : setFilteredCollections(filterCollections(query, allCollections));
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
          value={collectionSymbol}
          placeholder="Enter collection name: eg. blockstars"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && searchCollection(0, collectionSymbol)
          }
        ></Input>
        {/* <Button ml={4} onClick={() => searchCollection(0)}>
          Search
        </Button> */}
      </InputGroup>
      <Autocomplete
        filteredCollections={filteredCollections}
        searchCollection={searchCollection}
      />
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
  collectionSymbol: string;
  collectionInfo: CollectionInfo;
  pageNumber: number;
  loading: boolean;
  changePage: (skip: number, collectionSymbol: string) => void;
  sort: (value: string) => void;
}

export const ListingsContext = createContext<AppContextInterface | null>(null);

export default Index;
