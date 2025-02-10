
export default function Home() {
  return (
    <div className="grid grid-rows-2 gap-4 items-center justify-items-center p-8 font-[family-name:var(--font-geist-sans)]">
      Healthcare AI Home
      {/* login and signup */}
      <div className="grid grid-cols-2 gap-4">
        <a href="/auth/signin" className="py-3 px-6 text-center border hover:bg-slate-600 hover:text-white rounded-lg">Login</a>
        <a href="/auth/signup" className="py-3 px-6 text-center border hover:bg-slate-600 hover:text-white rounded-lg">Signup</a>
      </div>
    </div>
  );
}
