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
import axios from "axios";

export default function Home() {
  const user = useAuthStore((state: any) => state.user);
  const credit = useCreditStore((state: any) => state.credit);
  const [seconds, setSeconds] = useState(0);
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
  const [digit, setDigit] = useState("1");
  const [rewardHistory, setRewardHistory] = useState<any[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);

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

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_LOTTO_URL + "/api/v1/lotto/reward-history", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRewardHistory(res.data);
      });

    if (user) {
      axios
        .get(
          process.env.NEXT_PUBLIC_LOTTO_URL +
            "/api/v1/lotto/purchase-history/" +
            user.id,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPurchaseHistory(res.data);
          console.log(res.data);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          process.env.NEXT_PUBLIC_LOTTO_URL +
            "/api/v1/lotto/purchase-history/" +
            user.id,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPurchaseHistory(res.data);
        });
    }
  }, [user]);

  const onSubmit = () => {
    if (!user) {
      alert("Please login");
      return;
    }

    // check number is string contains only number with regex
    const regex = new RegExp("^[0-9]+$");
    if (!regex.test(number)) {
      alert("Number must be a number");
      return;
    }

    if (amount < 0) {
      alert("Amount must be positive");
      return;
    }

    if (amount > credit) {
      alert("Credit is unsufficient");
      return;
    }

    let body = {} as any;
    if (digit === "1") {
      body = {
        oneDigit: number.toString(),
        oneDigitAmount: amount,
      };
    } else if (digit === "2") {
      body = {
        twoDigit: number.toString(),
        twoDigitAmount: amount,
      };
    } else if (digit === "3") {
      body = {
        threeDigit: number.toString(),
        threeDigitAmount: amount,
      };
    }

    body["userId"] = user.id;
    console.log(body);

    axios
      .post(
        process.env.NEXT_PUBLIC_LOTTO_URL + "/api/v1/lotto/purchase",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert("Purchase success");
        window.location.reload();
      });
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
          onChange={(e) => setNumber(e.target.value)}
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
                <Th isNumeric>3 Digits</Th>
                <Th>Round</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rewardHistory.map((item) => (
                <Tr key={item.label}>
                  <Td textAlign={"center"}>{item?.oneDigit}</Td>
                  <Td textAlign={"center"}>{item?.twoDigit}</Td>
                  <Td textAlign={"center"}>{item?.threeDigit}</Td>
                  <Td textAlign={"center"}>{item?.id}</Td>
                </Tr>
              ))}
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
                {purchaseHistory.map((item) => (
                  <>
                    {item.oneDigit && (
                      <Tr>
                        <Td textAlign={"center"}>
                          {/* <Icon color={"red"} as={MdCancel} /> */}-
                        </Td>
                        <Td textAlign={"center"}>{item.oneDigit}</Td>
                        <Td textAlign={"center"}>{item.oneDigitAmount}</Td>
                        <Td textAlign={"center"}>{item.prizeId}</Td>
                      </Tr>
                    )}
                    {item.twoDigit && (
                      <Tr>
                        <Td textAlign={"center"}>
                          {/* <Icon color={"red"} as={MdCancel} /> */}-
                        </Td>
                        <Td textAlign={"center"}>{item.twoDigit}</Td>
                        <Td textAlign={"center"}>{item.twoDigitAmount}</Td>
                        <Td textAlign={"center"}>{item.prizeId}</Td>
                      </Tr>
                    )}
                    {item.threeDigit && (
                      <Tr>
                        <Td textAlign={"center"}>
                          {/* <Icon color={"red"} as={MdCancel} /> */}-
                        </Td>
                        <Td textAlign={"center"}>{item.threeDigit}</Td>
                        <Td textAlign={"center"}>{item.threeDigitAmount}</Td>
                        <Td textAlign={"center"}>{item.prizeId}</Td>
                      </Tr>
                    )}
                  </>
                ))}

                {/* <Tr>
                  <Td textAlign={"center"}>
                    <Icon color={"green"} as={MdCheckCircle} />
                  </Td>
                  <Td textAlign={"center"}>12</Td>
                  <Td textAlign={"center"}>123</Td>
                  <Td textAlign={"center"}>12 Dec 23 15:24</Td>
                </Tr> */}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </main>
  );
}
