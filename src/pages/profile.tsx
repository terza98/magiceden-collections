import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { getTokensPerWallet } from "../api/queries";
import Loading from "../components/Loading";
import { Listing } from "../types/listing";
import { sortTokensByCollection } from "../utils/helpers";

const ProfilePage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<Map<string, Array<Listing>>>(
    new Map()
  );

  const getTokens = (): void => {
    setLoading(true);
    getTokensPerWallet(walletAddress).then(async (tokens) => {
      const newCollections = await sortTokensByCollection(tokens);
      setTimeout(() => {
        setLoading(false);
        setCollections(newCollections);
      }, 2500);
    });
  };
  return (
    <Box p={10} maxW="1300px" m="auto" textAlign="center">
      <Heading size="md" mb={8}>
        Enter you wallet address to retrieve listings by collections/rarity
      </Heading>
      <InputGroup display="flex" justifyContent="center">
        <Input
          border="1px solid"
          maxW="300px"
          value={walletAddress}
          placeholder="Enter wallet address:"
          onChange={(e) => setWalletAddress(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && getTokens()}
        ></Input>
        <Button onClick={() => getTokens()}>Search</Button>
      </InputGroup>
      <Loading loading={loading} justifyCenter />
      <Box>
        {Array.from(collections.entries()).map((collection) => (
          <>
            <Heading fontSize="md" my={4}>
              {collection[0]}
            </Heading>
            <SimpleGrid
              key={collection[0]}
              columns={5}
              spacing={0}
              mt={8}
              maxW="750px"
              m="auto"
            >
              {collection[1].map((token) => (
                <Flex
                  as={Link}
                  href={token.meUrl}
                  target="_blank"
                  key={token.meUrl}
                  position="relative"
                  cursor="pointer"
                  bg="rgba(255,255,255,.3)"
                >
                  <Text
                    position="absolute"
                    top={0}
                    color="black"
                    fontWeight="bold"
                    fontSize={14}
                    p={1}
                    bg="rgba(255,255,255,.3)"
                  >
                    RANK: {token.nft?.rank}
                  </Text>
                  <Image src={token.nft?.image} w="150px" h="150px" />
                  <Text
                    position="absolute"
                    bottom={0}
                    color="black"
                    fontWeight="bold"
                    fontSize={14}
                    p={1}
                    bg="rgba(255,255,255,.3)"
                  >
                    ID: #{token.nft?.name.split("#")[1]}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
