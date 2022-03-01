import { Flex, Image } from "@chakra-ui/react";

interface LoadingProps {
  loading: boolean;
  justifyCenter?: boolean;
}
const Loading = ({ loading, justifyCenter }: LoadingProps) => {
  return (
    loading && (
      <Flex justify={justifyCenter ? "center" : "left"}>
        <Image src="loading.gif" maxW="150px" maxH="150px" w="100%" />
      </Flex>
    )
  );
};

export default Loading;
