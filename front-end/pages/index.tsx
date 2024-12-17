import Head from 'next/head';
import React from "react";
import Header from '@components/general/header';
import HomeComponent from '@components/general/homeComponent';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>ClinicaLink</title>
      </Head>
      <Header/>
      <main>
      <HomeComponent/>
      </main>
    </>
  )
}

export default Home;