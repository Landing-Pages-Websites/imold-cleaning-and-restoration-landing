import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { GTM_ID, SITE_ID, SITE_KEY } from "@/components/Brand";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title:
    "Carpet Cleaning in South King & Pierce County, WA | Tubro Carpet Cleaning",
  description:
    "Professional carpet cleaning across South King & Pierce County — $259 5-room special. IICRC certified, 4.9 stars from 230+ Google reviews, dry in 6–12 hours, eco-friendly and safe for kids & pets. Call (253) 499-1028.",
  openGraph: {
    title: "Tubro Carpet Cleaning | $259 5-Room Special | South King & Pierce County",
    description:
      "IICRC-certified carpet cleaning. Dry in 6–12 hours, eco-friendly, upfront pricing. 4.9 stars, 230+ Google reviews. Book your $259 5-room special.",
    type: "website",
    url: "https://www.tubrocarpetcleaning.com",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* MegaTag config — set BEFORE optimizer loads */}
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* CallTrackingMetrics — dynamic phone swap */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
