"use client";
import axios from "axios";
import "./globals.css";
import { Providers } from "./providers";
import { Box, Button, Link, Text, textDecoration } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/app.store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      axios
        .get(process.env.NEXT_PUBLIC_AUTH_URL + "/api/v1/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          useAuthStore.setState({ user: res.data.user });
        });

      // axios
      //   .get(process.env.NEXT_PUBLIC_AUTH_URL + "/api/v1/auth/profile", {})
      //   .then((res) => {});
    } else {
      setIsLogin(false);
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            p={3}
            w={"100%"}
            bgColor={"black"}
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link
              href="/"
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
              fontWeight={"bold"}
            >
              TCC Lotto
            </Link>
            <Box display={"flex"} alignItems={"center"}>
              {isLogin && (
                <>
                  <Text mr={2}>{user.fullname} | </Text>
                  <Text mr={2}>120 Credits</Text>
                  <Link mr={2} href={"/login"}>
                    <Button onClick={() => onLogout()}>Logout</Button>
                  </Link>
                </>
              )}
              {!isLogin && (
                <>
                  <Link mr={2} href={"/login"}>
                    <Button>Login</Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </Box>
          </Box>
          {children}
        </Providers>
      </body>
    </html>
  );
}
