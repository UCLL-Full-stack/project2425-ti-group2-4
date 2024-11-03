import Head from 'next/head';
import React from "react";
import Header from '@components/general/header';

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

export default Home;