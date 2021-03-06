import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ListingsContext } from "../../pages";

export const TableActions = () => {
  const { collectionSymbol, sort } = useContext(ListingsContext);

  const [query, setQuery] = useState<string>("");

  return (
    <Stack
      spacing="4"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      mb={8}
    >
      <HStack>
        <FormControl minW={{ md: "320px" }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Search by ID</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder="Search by ID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <Button
          as={Link}
          target="_blank"
          href={`https://howrare.is/${collectionSymbol.toLowerCase()}/${query}`}
        >
          Search
        </Button>
      </HStack>

      <Flex alignItems="center">
        <Text mr={4}>Sort by</Text>
        <Select
          w={{ base: "300px", md: "unset" }}
          rounded="base"
          size="sm"
          defaultValue="rarity"
          placeholder="Rarity descending"
          onChange={(e) => sort(e.target.value)}
        >
          <option value="price">Price (low to high)</option>
        </Select>
      </Flex>
    </Stack>
  );
};
