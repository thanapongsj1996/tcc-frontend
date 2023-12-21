"use client";
import axios from "axios";
import "./globals.css";
import { Providers } from "./providers";
import { Avatar, Box, Button, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthStore, useCreditStore } from "@/store/app.store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<any>({});
  const [credit, setCredit] = useState<any>(0);

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
          const user = res.data.user;
          setUser(user);
          useAuthStore.setState({ user: user });

          axios
            .get(
              process.env.NEXT_PUBLIC_CREDIT_URL + `/api/v1/credit/${user.id}`,
              {}
            )
            .then((res) => {
              const credit = parseInt(res.data.credit);
              useCreditStore.setState({ credit: credit });
              console.log("credit: ", credit);
              setCredit(credit);
            });
          console.log(user.id);
        });
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
                  <Avatar mr={1} size={"sm"} />
                  <Text mr={2}>{user.fullname} | </Text>
                  <Text mr={2}>{credit} Credits</Text>
                  <Button
                    onClick={() => window.location.reload()}
                    mr={4}
                    colorScheme="green"
                  >
                    Refresh
                  </Button>
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
