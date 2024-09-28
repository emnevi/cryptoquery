import Script from 'next/script';

const NEXT_PUBLIC_TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_TRACKING_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${NEXT_PUBLIC_TRACKING_ID}');
        `}
            </Script>
        </>
    )
}

export default GoogleAnalytics