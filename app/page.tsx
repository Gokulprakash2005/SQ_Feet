import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Property Management System</h1>
        <Link 
          href="/admin" 
          className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-600 transition-colors"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}
