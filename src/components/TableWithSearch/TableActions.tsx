import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { BsSearch } from "react-icons/bs";
import { RiAddFill, RiArrowRightUpLine } from "react-icons/ri";

export const TableActions = () => {
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
            <FormLabel srOnly>Filter by ID or RANK</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder="Filter by ID or RANK..."
            />
          </InputGroup>
        </FormControl>

        <Button> Filter</Button>
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
