import 'antd/dist/antd.css';
import '@/styles/globals.css';

import type {AppProps as NextAppProps} from "next/app";
import {wrapper} from "../store";
import dynamic from "next/dynamic";
import {DefaultSeo} from "next-seo";
import SEO from "../../next-seo.config";
import {Provider} from "react-redux";

const MainLayout = dynamic(() => import('@/layouts/MainLayout'));
const Progress = dynamic(() => import('@/components/ProgressBar'));

type AppProps<P = any> = {
    Component: NextAppProps<P>['Component'] & { theme?: string };
    rest: any;
} & P;

function MyApp({Component, ...rest}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);

    return (
        <>
            <DefaultSeo {...SEO}/>
            <Progress/>
            <Provider store={store}>
                <MainLayout theme={Component.theme}>
                    <Component {...props.pageProps} />
                </MainLayout>
            </Provider>
        </>
    )
}

export default MyApp;
