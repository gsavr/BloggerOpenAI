import "../styles/global.css";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Roboto_Serif, Roboto } from "@next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
//above stop fontawesome from being huge for a moment in production

//implement google fonts by assigning them to a variable
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotoSerif = Roboto_Serif({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-serif",
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <UserProvider>
      <Head>
        <title>AI Blogger</title>
        <meta property="og:title" content="AI Blogger" key="title" />
      </Head>
      <main className={`${roboto.variable} ${robotoSerif.variable} font-body`}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
    </UserProvider>
  );
}

export default MyApp;
