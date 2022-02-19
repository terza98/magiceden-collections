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
import { elementDragControls } from "framer-motion/types/gestures/drag/VisualElementDragControls";
import * as React from "react";
import { ListingsContext } from "../../pages";
import { User } from "./User";
import { columns, data } from "./_data";

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
      Header: "Collection",
      accessor: "collection",
    },
    {
      Header: "Floor Price",
      accessor: "floor_price",
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
        {listingsContext.data.map((row, index) => (
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
        ))}
      </Tbody>
    </Table>
  );
};
