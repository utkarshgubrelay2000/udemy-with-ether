import React, { useEffect } from "react";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { FormProvider } from "../components/FormContext";

export default (pageProps) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const headerProps = {
    nav: {
      classes: pageProps.nav && pageProps.nav.classes,
      fixed: pageProps.nav && pageProps.nav.fixed,
      color: pageProps.nav && pageProps.nav.color,
      light: pageProps.nav && pageProps.nav.light,
      dark: pageProps.nav && pageProps.nav.dark,
    },
    loggedUser: isAuthenticated,
    headerClasses: pageProps.headerClasses,
  };

  return (
    <div
      style={{ paddingTop: pageProps.noPaddingTop ? "0" : "72px" }}
      className={pageProps.className}
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap"
        />
        <link rel="icon" href="/ws_favicon/favicon.ico" />
        <link
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.8/css/swiper.min.css"
          rel="stylesheet"
        />
        <title>{pageProps.title} - WorkSchool</title>
      </Head>
      <NextNProgress color="#4E66F8" options={{ showSpinner: false }} />
      {!pageProps.hideHeader && <Header {...headerProps} />}

      {pageProps.listingForm || pageProps.bookingForm ? (
        <React.Fragment>
          {pageProps.listingForm && (
            <FormProvider>
              <main>{pageProps.children}</main>
            </FormProvider>
          )}
        </React.Fragment>
      ) : (
        <main>{pageProps.children}</main>
      )}

      {!pageProps.hideFooter && <Footer />}
    </div>
  );
};
