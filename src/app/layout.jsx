import Link from "next/link";
import "./globals.css";
import { Lavishly_Yours, Roboto } from 'next/font/google'
import { AntdRegistry } from "@ant-design/nextjs-registry";


const lavishy = Lavishly_Yours({
  subsets: ["latin"],
  weight: ["400"]
})


const roboto = Roboto({
  weight: ["400", "200", "700", "900"]
})

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body>
        <header>
          <div>LOGO</div>
          <nav>
            <Link href="/">Главная</Link>
            <Link href="/about">О нас</Link>
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
