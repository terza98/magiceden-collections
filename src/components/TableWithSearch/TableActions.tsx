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
  const { collectionName } = useContext(ListingsContext);

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
          href={`https://howrare.is/${collectionName}/${query}`}
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
          placeholder="Rarity descending"
        >
          <option>Rarity ascending</option>
          <option>Price (low to high)</option>
          <option>Price (high to low)</option>
        </Select>
      </Flex>
    </Stack>
  );
};
