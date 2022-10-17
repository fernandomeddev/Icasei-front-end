import { useState, FormEvent } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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


export default function Search() {
    const [ query, setQuery ] = useState('')
    const [ result, setResult ] = useState(false)
    const [ videos, setVideos ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleClose = () => setShow(false);


    async function handleSearch(event: FormEvent) {
        event.preventDefault();

       if(query === ''){
        setResult(false)
        return 
       }
       const response = await youtube.get('/search', {params: { q: query}});
       
       console.log(response)
       if(response.data){
        setVideos(response.data.items)
        console.log(videos)
        setResult(true)
       }
    }

    async function showModal(id:string) {
        alert(id)
    }

    if( result){
        return(
            <>
                <Head>
                    <title>Search || MedTube</title>
                </Head>
                <div>
                    <Header />
                    <main className={styles.container}>
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
                    <div>
                    {videos.map((video) =>(
                        <div key={video.id.videoId} >
                            <div >
                                <div className={styles.videoContent}>
                                    <h1>{video.snippet.title}</h1>
                                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id.videoId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </div>
                                <div>
                                <Button variant="danger" onClick={() => {
                                    setModalData(video);
                                    setShow(true);
                                }}>
                                    show more
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>{modalData?.snippet.title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> <iframe width="560" height="315" src={`https://www.youtube.com/embed/${modalData?.id.videoId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> <p>{ modalData?.snippet.description }</p> </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close 
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
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

/* export const getServerSideProps: GetServerSideProps = async ({ req, res}) =>{
    const response = await youtube.get('/search', {params: { q: 'corinthians'}});
    const videos = response.data.items;

    return {
        props:{
            videos,
        }
    }
} */

