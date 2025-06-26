import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="mx-auto text-3xl md:text-5xl font-bold mb-0 md:mb-4 px-6 pt-6 md:pt-0">Custom Authentication Template</h1>
        <section className="py-5 px-6 md:px-12 lg:px-24 pb-15">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-200 text-lg leading-relaxed pb-5">
              This project showcases a fully custom-built authentication system developed to gain a deeper understanding of how secure user authentication works behind the scenes. It includes functionality for user registration, login, and password reset.
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li><span className="font-semibold">Frontend:</span> Built with <span className="font-medium">Next.js</span>, using Tailwind CSS for styling.</li>
              <li><span className="font-semibold">Backend:</span> Powered by <span className="font-medium">Java Spring Boot</span>, handling authentication logic and email services.</li>
              <li><span className="font-semibold">Security:</span> Implements <span className="font-medium">password hashing with salt</span> and <span className="font-medium">JWT tokens</span> stored securely as HTTP-only cookies.</li>
              <li><span className="font-semibold">Email Service:</span> Utilizes <span className="font-medium">JavaMail</span> to send password reset emails.</li>
            </ul>
          </div>
          <p className="text-sm text-blue-400 mt-6 italic mx-auto max-w-4xl">
            Note: This authentication system was developed for educational purposes. It has not been security-audited and should not be used in production environments.
          </p>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[2px] flex-wrap items-center justify-center text-md md:text-md ">
        <div className="flex pt-4 pb-2 max-w-3/4">
          <div className="mx-auto mt-2 px-3">
            <span className="flex-col w-full">First time here? </span>
              <Link href="/register"className="font-bold text-blue-400 hover:text-blue-600 underline">
                Register
              </Link>
          </div>
          <div className="mx-auto mt-2 max-w-3/4px-3">
            <span className="flex-col w-full">Already have an account? </span>
            <Link href="/login"className="font-bold text-blue-400 hover:text-blue-600 underline">
              Login
            </Link>
          </div>
          <div className="mx-auto mt-2 px-3 max-w-3/4">
            <span className="flex-col w-full">Check out the code? </span>
            <Link href="/" className="font-bold text-blue-400 hover:text-blue-600 underline">
              Code
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
