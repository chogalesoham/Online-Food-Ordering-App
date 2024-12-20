import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h1>Hello Next-app</h1>
      <Button>click</Button>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
