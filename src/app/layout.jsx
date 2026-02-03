import Link from "next/link";
import "./globals.css";
import { Lavishly_Yours, Roboto } from 'next/font/google'
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";


const lavishy = Lavishly_Yours({
  subsets: ["latin"],
  weight: ["400"]
})


const roboto = Roboto({
  weight: ["400", "200", "700", "900"]
})

export default async function RootLayout({ children }) {


  const session = await getServerSession()

  console.log(session)

  return (
    <html lang="en">
      <body>
        <header>
          <div>LOGO</div>
          <nav className="flex gap-x-5">
            <Link href="/">Главная</Link>
            <Link href="/about">О нас</Link>


            {
              session ? (
                <SignOutButton />
              ) :
                (
                  <>
                    <Link href="/register">Зарегистрироваться</Link>
                    <Link href="/api/auth/signin">Вход</Link>
                  </>
                )
            }



          </nav>
        </header>
        <main>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
