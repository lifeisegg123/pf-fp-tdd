import type { AppProps } from "next/app";
import "src/styles/flex.css";
import "src/styles/gap.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
