import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { ListingsContext } from "../../pages";

export const TablePagination = () => {
  const { data, pageNumber, changePage } = React.useContext(ListingsContext);

  return (
    <Flex align="center" justify="space-between">
      <Text color={mode("gray.600", "gray.400")} fontSize="sm">
        {data.length} listings
      </Text>
      <ButtonGroup variant="outline" size="sm">
        {pageNumber !== 0 && (
          <Button as="a" rel="prev" onClick={() => changePage(pageNumber - 1)}>
            Previous page
          </Button>
        )}
        <Button as="a" rel="next" onClick={() => changePage(pageNumber + 1)}>
          Next page
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
