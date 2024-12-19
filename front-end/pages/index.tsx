import Head from 'next/head';
import React from "react";
import Header from '@components/general/header';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>ClinicaLink</title>
      </Head>
      <Header/>
      <main>
      </main>
    </>
  )
}

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;