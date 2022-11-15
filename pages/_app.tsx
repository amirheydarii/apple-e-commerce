import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
