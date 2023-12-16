import { Input, Button, Link } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Login</h1>
      <div className="sm:col-span-4">
        <div className="my-2">
          <Input placeholder="user name" />
        </div>
        <div className="my-2">
          <Input placeholder="password" />
        </div>
        <div className="flex justify-between align-bottom my-2">
          <Link href={"/register"}>Register?</Link>
          <Button colorScheme="blue">Login</Button>
        </div>
      </div>
    </main>
  );
}
