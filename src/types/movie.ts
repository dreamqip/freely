import { IMovieCast } from "./cast"
import { Images } from "./images"
import { IVideos } from "./videos"
import { IReviews } from "@/types/reviews"
import { IMovieCredits } from "@/types/credits"

interface IGenres {
    id: number
    name: string
}

export interface IMovie extends IMovieCast {
    poster_path: string | null
    adult: boolean
    overview: string
    release_date: string
    genre_ids: number[]
    id: number
    original_title: string
    original_language: string
    title: string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    video: boolean
    vote_average: number
    genres: IGenres[]
    budget: number
    revenue: number
    runtime: number
    status: string
    production_companies: IProductionCompanies[]
    production_countries: IProductionCountries[]
    keywords: {
        results: IKeyword[]
    }
    media_type: string
    images: Images
    videos: IVideos
    reviews: IReviews
    similar: ISimilarMovies
    recommendations: IRecommendedMovies
    credits: IMovieCredits
}

interface IProductionCompanies {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

interface IProductionCountries {
    iso_3166_1: string
    name: string
}

export interface IKeyword {
    id: number
    name: string
}

export interface ISimilarMovies {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
}

export interface IRecommendedMovies {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
}
