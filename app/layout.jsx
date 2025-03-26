import "../styles/reset.css";
import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {AuthProvider} from "./hooks/useAuth/client";
import Header from "./component/Header";

export const metadata = {
  title: "Authify",
  description: "Login and register example app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body className="antialiased vsc-initialized">
        <AuthProvider>
          {children}
          </AuthProvider>
      </body>
    </html>
  );
}
