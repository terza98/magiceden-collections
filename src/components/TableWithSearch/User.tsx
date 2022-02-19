import { Box, Img, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface UserProps {
  data: {
    image: string;
    name: string;
    rank: number;
  };
}

export const User = (props: UserProps) => {
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [rank, setRank] = useState<number>();

  useEffect(() => {
    setImage(props.data?.image);
    setName(props.data?.name);
    setRank(props.data?.rank);
  }, [props.data]);

  return (
    <Stack direction="row" spacing="4" align="center">
      <Box flexShrink={0} h="10" w="10">
        <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="full"
          src={image}
          alt=""
        />
      </Box>
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          RANK: {rank}
        </Box>
        <Box fontSize="sm" color="gray.500">
          {name}
        </Box>
      </Box>
    </Stack>
  );
};
