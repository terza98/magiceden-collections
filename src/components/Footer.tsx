import { Flex, FlexProps, Link, Text } from "@chakra-ui/react";

export const Footer = (props: FlexProps) => (
  <Flex as="footer" py="3rem" {...props} justify="center">
    <Text>
      Created by{" "}
      <Link href="https://mladenterzic.com" color="blue">
        Mladen Terzic
      </Link>{" "}
      with React ❤️ Next ❤️ Typescript ❤️ Chakra
    </Text>
  </Flex>
);
