import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold  mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-red-800 px-6 py-3 text-white font-medium hover:bg-ted-700 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
