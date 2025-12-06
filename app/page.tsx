import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-stone-50 to-zinc-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-slate-800">
          SQ<span className="text-amber-500">.</span>Feet
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Turning Your Real Estate Dreams to Reality
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/admin/auth" 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
