import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center 
        bg-[linear-gradient(to_bottom,#dcdcdc,#a9a9a9,#696969)] px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT SIDE TEXT LIKE SAMPLE IMAGE */}
        <div className="pl-4">
          <p className="text-lg font-semibold tracking-wide text-gray-700 mb-4">
            Logotype
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#1a1a1a] font-serif">
            Amazing Heading <br />
            Text Right Here
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed mt-6 max-w-md">
            Expenses as material breeding insisted building to in. Continual so
            distrust pronounce by unwilling listening. Thing do taste on we
            manor. Him had wound use found hoped.
          </p>

          {/* Replace buttons → Your portal button */}
          <div className="mt-10">
            <Link
              href="/admin/auth"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold 
              px-8 py-4 rounded-lg text-lg transition-all duration-200 
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/Landing.jpeg"
            alt="Retail POS"
            width={650}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
