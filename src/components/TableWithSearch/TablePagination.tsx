import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { ListingsContext } from "../../pages";

export const TablePagination = () => {
  const { collectionSymbol, pageNumber, changePage } =
    React.useContext(ListingsContext);

  return (
    <Flex align="center" justify="space-between">
      <Text color={mode("gray.600", "gray.400")} fontSize="sm">
        Shows 20 listings per page
      </Text>
      <Box>
        <ButtonGroup variant="outline" size="sm">
          {pageNumber !== 0 && (
            <Button
              as="a"
              rel="prev"
              onClick={() => changePage(pageNumber - 1, collectionSymbol)}
            >
              Previous page
            </Button>
          )}
          <Button
            as="a"
            rel="next"
            onClick={() => changePage(pageNumber + 1, collectionSymbol)}
          >
            Next page
          </Button>
        </ButtonGroup>
        <Text mt={2} textAlign="right">
          Page number: {pageNumber + 1}
        </Text>
      </Box>
    </Flex>
  );
};
