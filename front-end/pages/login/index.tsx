import Header from '@components/general/header';
import LoginForm from '@components/users/loginForm';
import UserOverviewTable from '@components/users/userOverviewTable';
import Head from 'next/head';
import React, { useEffect, useState } from "react";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Header></Header>
            <main>
                <LoginForm/>
                <UserOverviewTable/>
            </main>
        </>
    )
}


export default Login;