// src/pages/_app.js

import "@/styles/globals.css"; // keep your global styles
import { Analytics } from '@vercel/analytics/react'; // add this line

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics /> {/* add the analytics component */}
    </>
  );
}
