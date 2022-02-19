import { Flex, Image } from "@chakra-ui/react";

interface LoadingProps {
  loading: boolean;
}
const Loading = ({ loading }: LoadingProps) => {
  return (
    loading && (
      <Flex justify="center">
        <Image src="loading.gif" maxW="150px" maxH="150px" w="100%" />
      </Flex>
    )
  );
};

export default Loading;
