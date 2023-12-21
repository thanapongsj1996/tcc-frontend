"use client";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { useAuthStore, useCreditStore } from "@/store/app.store";
import { MdCancel, MdCheckCircle } from "react-icons/md";

export default function Home() {
  const user = useAuthStore((state: any) => state.user);
  const credit = useCreditStore((state: any) => state.credit);
  const [seconds, setSeconds] = useState(0);
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState(0);
  const [digit, setDigit] = useState("1");

  useEffect(() => {
    const updateSeconds = () => {
      const currentDate = new Date();
      const currentSeconds = currentDate.getSeconds();
      const remainingSeconds = 60 - currentSeconds;
      setSeconds(remainingSeconds);
    };
    updateSeconds();
    const intervalId = setInterval(updateSeconds, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const onSubmit = () => {
    if (!user) {
      alert("Please login");
      return;
    }

    if (number < 0) {
      alert("Number must be positive");
      return;
    }

    if (digit === "1") {
      if (number > 9) {
        alert("Number must be less than 10");
        return;
      }
    } else if (digit === "2") {
      if (number > 99) {
        alert("Number must be less than 100");
        return;
      }
    } else if (digit === "3") {
      if (number > 999) {
        alert("Number must be less than 1000");
        return;
      }
    }

    if (amount < 0) {
      alert("Amount must be positive");
      return;
    }

    if (amount > credit) {
      alert("Credit is unsufficient");
      return;
    }

    alert("ok");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-3xl font-bold text-center">Reward in</h1>
      <h1 className="text-6xl font-bold text-center">{seconds} s</h1>
      <Box pt={"20px"} justifyContent={"center"}>
        <RadioGroup onChange={setDigit} value={digit}>
          <Stack direction="row">
            <Radio size={"lg"} value="1">
              1 Digit
            </Radio>
            <Radio size={"lg"} value="2">
              2 Digits
            </Radio>
            <Radio size={"lg"} value="3">
              3 Digits
            </Radio>
          </Stack>
        </RadioGroup>
        <Input
          mt={3}
          onChange={(e) => setNumber(+e.target.value)}
          type="number"
          placeholder="Number"
        />
        <Input
          mt={3}
          onChange={(e) => setAmount(+e.target.value)}
          type="number"
          placeholder="Amount"
        />
        <Button onClick={() => onSubmit()} mt={2} colorScheme="blue">
          Submit
        </Button>
      </Box>
      <Box pt={"40px"}>
        <Heading as={"h1"} size={"md"}>
          Reward history
        </Heading>
        <TableContainer mt={2}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th isNumeric>1 Digit</Th>
                <Th isNumeric>2 Digits</Th>
                <Th isNumeric>2 Digits</Th>
                <Th>Round</Th>
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
      {user && (
        <Box pt={"40px"}>
          <Heading as={"h1"} size={"md"}>
            Purchase history
          </Heading>
          <TableContainer mt={2}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th isNumeric>Status</Th>
                  <Th isNumeric>Number</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Round</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign={"center"}>
                    <Icon color={"red"} as={MdCancel} />
                  </Td>
                  <Td textAlign={"center"}>12</Td>
                  <Td textAlign={"center"}>123</Td>
                  <Td textAlign={"center"}>12 Dec 23 15:25</Td>
                </Tr>
                <Tr>
                  <Td textAlign={"center"}>
                    <Icon color={"green"} as={MdCheckCircle} />
                  </Td>
                  <Td textAlign={"center"}>12</Td>
                  <Td textAlign={"center"}>123</Td>
                  <Td textAlign={"center"}>12 Dec 23 15:24</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </main>
  );
}
