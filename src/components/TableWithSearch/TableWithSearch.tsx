import { Box, Heading } from "@chakra-ui/react";
import * as React from "react";
import { ListingsContext } from "../../pages";
import { TableActions } from "./TableActions";
import { TableContent } from "./TableContent";
import { TablePagination } from "./TablePagination";

export const TableWithSearch = () => {
  const listingsContext = React.useContext(ListingsContext);

  return (
    <Box as="section" py="12">
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            Page Number: {listingsContext.pageNumber + 1}
          </Heading>
          <TableActions />
          <TablePagination />
          <TableContent />
        </Box>
      </Box>
    </Box>
  );
};
