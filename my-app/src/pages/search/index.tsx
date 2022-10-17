import { useState, FormEvent } from "react";

import youtube from '../../services/youtube/youtube'
import { GetServerSideProps, NextPage } from 'next'

import Head from "next/head";
import { Header } from "../../components/ui/Header";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

interface Video {
    "kind": "youtube#searchResult",
    "id": {
      "kind": string,
      "videoId": string,
      "channelId": string,
      "playlistId": string
    },
    "snippet": {
      "publishedAt":string,
      "channelId": string,
      "title": string,
      "description": string,
      "thumbnails": {
        (key: any): {
          "url": string,
          "width": string,
          "height": string
        }
      },
      "channelTitle": string
    }
  }

  interface StateProps {
    videos: Video[],
  }

  type Props = StateProps;


const Search: NextPage<Props> = ({ videos }: Props) => {
    const renderPosts = () => {
        const postList = Array.from(videos).filter((i) => (i.id.videoId))
            .reverse().map((post: Video) => {
                const description = post.snippet.description;

                return (
                    <>
                        <ul>
                            <li key={post.id.videoId}>
                                <div>
                                    <iframe src={`http://www.youtube.com/embed/${post.id.videoId}`}></iframe>
                                </div>
                                <h2>
                                    {post.snippet.title}
                                </h2>
                                <p>
                                    {description}
                                </p>
                            </li>
                        </ul>
                    </>
                    
                )
            });

        return (
            <ul>
                { postList }
            </ul>
        )
    }

    const [ query, setQuery] = useState('')
    const [ result, setResult] = useState(false)
    const [ loading, setLoading] = useState(false)

    async function handleSearch(event: FormEvent) {
        event.preventDefault();

       if(query === ''){
        return console.log('vazio')
       }
       const response = await youtube.get('/search', {params: { q: query}});
       console.log(response)
       if(response){
        setResult(true)
       }
    }
    
    if( result){
        return(
            <>
                {  renderPosts() }
            </>
        )
    }
    return(
        <>
            <Head>
                <title>Search || MedTube</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Campo de busca aqui</h1>
                    <form className={styles.form} onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="search..."
                            className={styles.input}
                            value={query}
                            onChange={ (e) => setQuery(e.target.value )}
                            />
                        
                        <button className={styles.buttonSearch} type="submit">
                            Search
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res}) =>{
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=120'
    )
    const response = await youtube.get('/search', {params: { q: 'corinthians'}});
    const videos = response.data.items;

    return {
        props:{
            videos,
        }
    }
}

export default Search

