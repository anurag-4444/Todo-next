import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/app.scss";
import Header from "./header"
import { ContextProvider } from "@/components/Clients";
  
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "This is a Todo App Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
            <Header />
            {children}
        </ContextProvider>
      </body>
    </html>
  );
}
