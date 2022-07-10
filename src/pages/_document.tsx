import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap"
                      rel="stylesheet"/>
            </Head>
            <body className="font-rubik dark:bg-dark-theme">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
