import { Input, Button, Link } from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Register</h1>
      <div className="sm:col-span-4">
        <div className="my-2">
          <Input placeholder="user name" />
        </div>
        <div className="my-2">
          <Input placeholder="password" />
        </div>
        <div className="flex justify-between align-bottom my-2">
          <Link href={"/login"}>Login?</Link>
          <Button colorScheme="blue">Submit</Button>
        </div>
      </div>
    </main>
  );
}
