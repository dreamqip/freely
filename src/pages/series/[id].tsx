import {InferGetServerSidePropsType, NextPage} from "next";
import {wrapper} from "../../store";
import {getRunningOperationPromises, getTvShowById, useGetTvShowByIdQuery} from "@/services/themoviedb";
import Hero from "@/components/SeriesPage/Hero";
import {Suspense, useEffect} from "react";
import {useAppDispatch} from "@/hooks/redux";
import Meta from "@/components/Meta";
import {
    setSeries,
    setSeriesCast,
    setSeriesId,
    setSeriesImages,
    setSeriesRecommendations,
    setSeriesReviews,
    setSeriesSimilar,
    setSeriesVideos
} from "@/features/series/seriesSlice";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";

const Tabs = dynamic(() => import("@/components/SeriesPage/Tabs"), {suspense: true});

const TvShow: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({id}) => {
    const {data: series, isLoading, isError} = useGetTvShowByIdQuery(id);
    const dispatch = useAppDispatch();

    const keywords: string[] = series?.keywords.results.map((keyword: any) => keyword.name);

    useEffect(() => {
        if (!isLoading && !isError && series) {
            dispatch(setSeries(series));
            dispatch(setSeriesId(id));
            dispatch(setSeriesImages(series.images));
            dispatch(setSeriesVideos(series.videos));
            dispatch(setSeriesSimilar(series.similar));
            dispatch(setSeriesRecommendations(series.recommendations));
            dispatch(setSeriesReviews(series.reviews));
            dispatch(setSeriesCast(series.credits));
        }
    }, [isLoading, dispatch, series, id, isError]);

    return (
        <article>
            <Meta
                description={series?.overview}
                title={series?.name}
                keywords={keywords}
            />
            <Hero/>
            <Suspense fallback={<Spinner/>}>
                <Tabs/>
            </Suspense>
        </article>
    );
};

// @ts-ignore
TvShow.theme = 'dark';

export default TvShow;

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const {id} = ctx.query;
    const parsedId = parseInt(id as string, 10);

    if (parsedId) {
        store.dispatch(getTvShowById.initiate(parsedId));
    }

    await Promise.all(getRunningOperationPromises());

    return {
        props: {
            id: parsedId
        }
    }
});
