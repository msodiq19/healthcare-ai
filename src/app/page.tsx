import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Healthcare AI</h1>
        <p className="text-lg text-gray-700">
          Revolutionizing healthcare with the power of AI. Join us to make a difference.
        </p>
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" asChild>
          <a href="/auth/signin">Login</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/auth/signup">Signup</a>
        </Button>
      </div>
    </div>
  );
}
