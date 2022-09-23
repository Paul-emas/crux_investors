import * as snippet from '@segment/snippet'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

const {
  NEXT_PUBLIC_SEGMENT_WRITE_KEY = 'NPsk1GimHq09s7egCUlv7D0tqtUAU5wa',
  NODE_ENV = 'development',
} = process.env

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  renderSnippet(): any {
    const opts = {
      apiKey: NEXT_PUBLIC_SEGMENT_WRITE_KEY,
      page: true,
    }

    if (NODE_ENV === 'development') {
      return snippet.max(opts)
    }
    return snippet.min(opts)
  }

  render(): JSX.Element {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <link rel="preload" href="/fonts/Aeonik-Regular.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Aeonik-Medium.otf" as="font" crossOrigin="anonymous" />
          <link
            rel="preload"
            href="/fonts/Aeonik-MediumItalic.otf"
            as="font"
            crossOrigin="anonymous"
          />
          <link rel="preload" href="/fonts/Aeonik-Regular.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/inter-webfont.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/inter-webfont.woff" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Inter.ttf" as="font" crossOrigin="anonymous" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* truetype */
              @font-face {
                font-family: 'Aeonik';
                font-style: normal;
                font-weight: 400;
                src: url('/fonts/Aeonik-Regular.otf') format('opentype');
                font-display: swap;
              }
              
              /* truetype */
              @font-face {
                font-family: 'Aeonik-Medium';
                font-style: normal;
                src: url('/fonts/Aeonik-Medium.otf') format('opentype');
                font-display: swap;
              }
              
              /* truetype */
              @font-face {
                font-family: 'Aeonik-Medium';
                font-style: italic;
                src: url('/fonts/Aeonik-MediumItalic.otf') format('opentype');
                font-display: swap;
              }
              
              @font-face {
                font-family: 'Inter';
                src: url('/fonts/inter-webfont.woff2') format('woff2'),
                  url('/fonts/inter-webfont.woff') format('woff'), url('/fonts/Inter.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }
    `,
            }}
          />
          <meta name="application-name" content="Crux Investor" />
          <meta name="description" content="Crux Investor" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="apple-mobile-web-app-title" content="Crux Investor" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#ffffff" />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
            integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8="
            crossOrigin="anonymous"
          ></link>
          <script src="https://polyfill.io/v3/polyfill.min.js"></script>
        </Head>
        <body className="bg-neutral-080 text-neutral-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
