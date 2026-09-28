import type { Metadata } from "next";
import { Archivo, Roboto } from "next/font/google";
import Script from "next/script";
import { GTM_ID, SITE_ID, SITE_KEY, META_PIXEL_ID } from "@/components/Brand";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-archivo",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title:
    "iMold Cleaning and Restoration | 24/7 Water Damage & Mold Removal in Southwest Florida",
  description:
    "24/7 water damage restoration and mold remediation across Southwest Florida. Free visual inspections, insurance paperwork handled, and full rebuild by a state-licensed, IICRC-certified team. Locally owned for 28 years — 1,200+ 5-star reviews. Call (239) 326-0357.",
  openGraph: {
    title:
      "iMold Cleaning and Restoration | 24/7 Water Damage & Mold Removal",
    description:
      "Free inspections. Insurance handled. One licensed company from emergency through full rebuild. Locally owned 28 years, IICRC-certified, 1,200+ 5-star reviews across Southwest Florida.",
    type: "website",
    url: "https://imold.us",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${roboto.variable} h-full antialiased`}
    >
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
        {/* Meta Pixel — PageView (Lead fires on form success in LeadForm) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
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
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
        {/* CallTrackingMetrics — dynamic phone swap (do not remove) */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
