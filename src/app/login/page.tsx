"use client";
import { Input, Button, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowErr, setIsShowErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_AUTH_URL + "/api/v1/auth/login", {
        email: username,
        password,
      })
      .then((res) => {
        console.log(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);

        setIsShowErr(false);
        window.location.href = "/";
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
      <h1 className="text-4xl font-bold">Login</h1>
      <div className="sm:col-span-4">
        <div className="my-2">
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Text
            align={"center"}
            display={isShowErr ? "block" : "none"}
            color={"red"}
          >
            Invalid username or password
            <br /> Please try again.
          </Text>
        </div>
        <div className="flex justify-between align-bottom my-2">
          <Link href={"/register"}>Register?</Link>
          <Button
            isDisabled={username === "" || password === "" || isLoading}
            colorScheme="blue"
            onClick={() => onSubmit()}
          >
            Login
          </Button>
        </div>
      </div>
    </main>
  );
}
