import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[100vh]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <Image
          src={'/HODL.png'}
          alt="HODL logo"
          width={1600}
          height={0}
          priority
          className="w-[100%]"
        />
        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}
      </main>
      <footer className="flex items-center justify-center h-full">
        <span className="font-bold">
          Official HODL100K BTC. Copyright © 2024.
        </span>
      </footer>
    </div>
  );
}
