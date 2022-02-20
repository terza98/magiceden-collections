import {
  Button,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { ListingsContext } from "../../pages";
import Loading from "../Loading";
import { RarestAttribute } from "./RarestAttribute";
import { User } from "./User";

export const TableContent = () => {
  const listingsContext = React.useContext(ListingsContext);
  const columns = [
    {
      Header: "NFT",
      accessor: "nft",
      Cell: function MemberCell(data: any) {
        return <User data={data} />;
      },
    },
    {
      Header: "Rarest attribute",
      accessor: "rarestAttribute",
      Cell: function MemberCell(data: any) {
        return <RarestAttribute data={data} />;
      },
    },
    {
      Header: "Attribute Count",
      accessor: "attributesCount",
    },
    {
      Header: "Price",
      accessor: "price",
    },
  ];

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode("gray.50", "gray.800")}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {listingsContext.loading ? (
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td>
              <Loading loading={listingsContext.loading} />
            </Td>
          </Tr>
        ) : (
          listingsContext.data.map((row) => (
            <Tr key={row.id}>
              {columns.map((column, index) => {
                const cell = row[column.accessor as keyof typeof row];
                const element = column.Cell?.(cell) ?? cell;
                return (
                  <Td whiteSpace="nowrap" key={index}>
                    {element}
                  </Td>
                );
              })}
              <Td textAlign="right">
                <Button
                  as={Link}
                  variant="link"
                  colorScheme="blue"
                  href={row.meUrl}
                  target="_blank"
                >
                  Magic Eden
                </Button>
                <br />
                <Button
                  as={Link}
                  variant="link"
                  colorScheme="blue"
                  href={row.howrareUrl}
                  target="_blank"
                  mt={4}
                >
                  HowRare
                </Button>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
};
