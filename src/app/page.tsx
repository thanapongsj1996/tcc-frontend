"use client";
import { useState } from "react";

import {
  Input,
  Button,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Heading,
  Box,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

export default function Home() {
  const [value, setValue] = useState("1");
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">{32} s</h1>
      <Box pt={"20px"} justifyContent={"center"}>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="1">1 Digit</Radio>
            <Radio value="2">2 Digits</Radio>
            <Radio value="3">3 Digits</Radio>
          </Stack>
        </RadioGroup>
        <Input mt={3} placeholder="Number" />
        <Input mt={3} placeholder="Amount" />
        <Button mt={2} colorScheme="blue">
          Submit
        </Button>
      </Box>
      <Box pt={"20px"}>
        <Heading as={"h1"} size={"lg"}>
          History
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th isNumeric>1 Digit</Th>
                <Th isNumeric>2 Digits</Th>
                <Th isNumeric>2 Digits</Th>
                <Th>Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textAlign={"center"}>1</Td>
                <Td textAlign={"center"}>12</Td>
                <Td textAlign={"center"}>123</Td>
                <Td textAlign={"center"}>12 Dec 23 15:25</Td>
              </Tr>
              <Tr>
                <Td textAlign={"center"}>1</Td>
                <Td textAlign={"center"}>12</Td>
                <Td textAlign={"center"}>123</Td>
                <Td textAlign={"center"}>12 Dec 23 15:24</Td>
              </Tr>
              <Tr>
                <Td textAlign={"center"}>1</Td>
                <Td textAlign={"center"}>12</Td>
                <Td textAlign={"center"}>123</Td>
                <Td textAlign={"center"}>12 Dec 23 15:23</Td>
              </Tr>
              <Tr>
                <Td textAlign={"center"}>1</Td>
                <Td textAlign={"center"}>12</Td>
                <Td textAlign={"center"}>123</Td>
                <Td textAlign={"center"}>12 Dec 23 15:22</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </main>
  );
}
