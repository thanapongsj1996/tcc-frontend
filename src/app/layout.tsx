import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Box, Button, Link, Text, textDecoration } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
              <Text mr={2}>120 Credits</Text>
              <Link mr={2} href={"/login"}>
                <Button>Login</Button>
              </Link>
              <Link href={"/register"}>
                <Button>Register</Button>
              </Link>
            </Box>
          </Box>
          {children}
        </Providers>
      </body>
    </html>
  );
}
