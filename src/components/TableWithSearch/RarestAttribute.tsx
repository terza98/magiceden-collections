import { Box, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface UserProps {
  data: {
    rarity: string;
    name: string;
    value: string;
  };
}

export const RarestAttribute = (props: UserProps) => {
  const [name, setName] = useState<string>();
  const [rarity, setRarity] = useState<string>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    setRarity(props.data?.rarity);
    setName(props.data?.name);
    setValue(props.data?.value);
  }, [props]);

  return (
    <Stack direction="row" spacing="4" align="center">
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {name}: &nbsp;{value}
        </Box>
        <Box fontSize="sm" color="gray.500">
          Rarity: {rarity}
        </Box>
      </Box>
    </Stack>
  );
};
