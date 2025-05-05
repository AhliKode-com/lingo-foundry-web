import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
        <Link
          href="/"
          className="bg-[#E15C31] animate-pulse text-white font-semibold py-2 px-4 rounded"
        >
          Go back home
        </Link>
      </div>
    );
  }
  