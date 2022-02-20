import { Box, Flex, Heading, IconButton, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BsDiscord, BsLink, BsTwitter } from "react-icons/bs";
import { ListingsContext } from "../../pages";
import { TableActions } from "./TableActions";
import { TableContent } from "./TableContent";
import { TablePagination } from "./TablePagination";

const iconButtonProps = {
  as: Link,
  target: "_blank",
  mr: 2,
};
export const TableWithSearch = () => {
  const { collectionName, collectionInfo } = useContext(ListingsContext);

  return (
    <Box as="section" py="12">
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box overflowX="auto">
          <Heading size="lg" mb="2">
            <Link href={`https://magiceden.io/marketplace/${collectionName}`}>
              {collectionInfo?.name}
            </Link>
          </Heading>
          <Text>{collectionInfo?.description}</Text>
          {collectionInfo && (
            <Flex my={4}>
              <IconButton
                {...iconButtonProps}
                aria-label="twitter"
                icon={<BsTwitter />}
                href={collectionInfo?.twitter}
              />
              <IconButton
                {...iconButtonProps}
                aria-label="discord"
                icon={<BsDiscord />}
                href={collectionInfo?.discord}
              />
              <IconButton
                {...iconButtonProps}
                aria-label="website"
                icon={<BsLink />}
                href={collectionInfo?.website}
              />
            </Flex>
          )}
          <TableActions />
          <TablePagination />
          <TableContent />
        </Box>
      </Box>
    </Box>
  );
};
