import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center space-y-5 px-10">
      <h2 className="max-md:text-6xl text-8xl max-w-2xl text-center font-bold drop-shadow-xl">
        Welcome to Quiz Builder
      </h2>
      <Link
        className="max-md:text-2xl text-4xl text-white/80 hover:text-white/60 duration-300 ease-in"
        href="/quizzes"
      >
        Go to your assets
      </Link>
    </main>
  );
}
