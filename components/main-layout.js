import Head from 'next/head';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Page Home</title>
                <meta name="description" content="Generated by create next app" />
                <meta charset="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </>
    );
};

export default MainLayout;