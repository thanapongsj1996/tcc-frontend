"use client";
import { Input, Button, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [isShowErr, setIsShowErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_AUTH_URL + "/api/v1/auth/register", {
        email: username,
        password,
        fullname,
      })
      .then((res) => {
        console.log(res);
        setIsShowErr(false);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
        setIsShowErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Register</h1>
      <div className="sm:col-span-4">
        <div className="my-2">
          <Input
            placeholder="full name"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Text
            align={"center"}
            display={isShowErr ? "block" : "none"}
            color={"red"}
          >
            Username is alreay exist.
            <br /> Please try again.
          </Text>
        </div>

        <div className="flex justify-between align-bottom my-2">
          <Link href={"/login"}>Login?</Link>
          <Button
            isDisabled={
              username === "" || password === "" || fullname === "" || isLoading
            }
            colorScheme="blue"
            onClick={() => onSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
