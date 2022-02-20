import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ListingsContext } from "../../pages";
import { TableActions } from "./TableActions";
import { TableContent } from "./TableContent";
import { TablePagination } from "./TablePagination";

export const TableWithSearch = () => {
  const { pageNumber, collectionName } = useContext(ListingsContext);

  return (
    <Box as="section" py="12">
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            <Link href={`https://magiceden.io/marketplace/${collectionName}`}>
              {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
            </Link>
          </Heading>

          <Text>Page number: {pageNumber + 1}</Text>
          <TableActions />
          <TablePagination />
          <TableContent />
        </Box>
      </Box>
    </Box>
  );
};
