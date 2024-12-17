import Header from '@components/general/header';
import SignupForm from '@components/users/signupForm';
import Head from 'next/head';
import React, { useEffect, useState } from "react";


const Signup: React.FC = () => {
    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>
            <Header></Header>
            <main>
                <SignupForm/>
            </main>
        </>
    )
}


export default Signup;