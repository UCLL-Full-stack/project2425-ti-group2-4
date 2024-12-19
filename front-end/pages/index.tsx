import Head from 'next/head';
import React from "react";
import Header from '@components/general/header';
import HomeComponent from '@components/general/homeComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitch from '@components/general/languageSwitch';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>ClinicaLink</title>
      </Head>
      <Header/>
      <main>
      <LanguageSwitch/>
      <HomeComponent/>
      </main>
    </>
  )
}
export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"]))
      }
  }
}

export default Home;