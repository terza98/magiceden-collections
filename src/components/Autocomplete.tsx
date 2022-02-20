import { Box, Flex, Img } from "@chakra-ui/react";
import { FilteredCollection } from "../types/collection";

interface AutocompleteProps {
  filteredCollections: Array<FilteredCollection>;
  searchCollection: (skip: number, collectionSymbol: string) => void;
}
export const Autocomplete = ({
  filteredCollections,
  searchCollection,
}: AutocompleteProps) => {
  if (!filteredCollections.length) return null;
  return (
    <Flex position="relative" justify="center" alignItems="center">
      <Flex
        position="absolute"
        top="0"
        flexDir="column"
        justify="center"
        w="600px"
        borderRadius={5}
        border="2px solid"
        borderColor="grey"
        p={4}
        maxH="300px"
        overflowY="scroll"
        zIndex={9}
        bg="black"
      >
        {filteredCollections.map((collection) => (
          <Flex
            key={collection.symbol}
            cursor="pointer"
            p={4}
            alignItems="center"
            _hover={{
              bg: "blue",
            }}
            onClick={() => searchCollection(0, collection.symbol)}
          >
            <Img
              objectFit="cover"
              htmlWidth="160px"
              htmlHeight="160px"
              w="50px"
              h="50px"
              rounded="full"
              src={collection.image}
              alt={collection.name}
              mr={4}
            />
            <Box>
              <Box fontSize="lg" fontWeight="medium">
                {collection.name}
              </Box>
              <Box fontSize="md" color="gray.500">
                Collection size: {collection.totalItems}
              </Box>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
