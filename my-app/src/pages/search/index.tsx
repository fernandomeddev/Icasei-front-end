import { useState, FormEvent } from "react";
import Modal from 'react-modal';

import { canSSRAuth } from "../../utils/canSSRAuth";

import apiyoutube from '../../services/youtube/youtube'
import youtubeVideoById from "../../services/youtube/youtube_video";

import Head from "next/head";
import { ModalVideo } from '../../components/ModalVideo';
import { CardVideo} from '../../components/CardVideo'
import { Header } from "../../components/ui/Header";
import styles from "./styles.module.scss";


export type VideoProps = {
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
        high: {
          "url": string,
          "width": string,
          "height": string
        }
      },
      "channelTitle": string
    }
  }

  interface SearchProps{
    videos: VideoProps[],
  }


export default function Search({ videos }: SearchProps) {
    const [ query, setQuery ] = useState('')
    const [ chopper, setChopper ] = useState(false)

    const [resultSerach , setResultSearch ] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState<VideoProps[]>(null);

    function handleCloseModal (){
        setModalVisible(false);
    } 

    async function handleOpenModalView(id: string){
    
        const response = await youtubeVideoById.get(`/videos`, { params: { id: id }});
        setModalItem(response.data.items)
        setModalVisible(true)
    }

    async function handleSearch(event: FormEvent) {
        event.preventDefault();

       if(query === ''){
        setChopper(false)
        return 
       }
       const response = await apiyoutube.get('/search', {params: { q: query }});
       
       if(response.data){
        setResultSearch(response.data.items)
        setChopper(true)
       }
    }

    Modal.setAppElement('#__next');

    if(chopper){
        return(
            <>
                <Head>
                    <title>Search || MedTube</title>
                </Head>
                <div>
                    <Header />
                    <main className={styles.container}>
                        <form className={styles.form} onSubmit={handleSearch}>
                            <div className={styles.busca}>
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
                            </div>
                            
                        </form>
                    </main>
                    <div className={styles.containerVideos}>
                        { resultSerach.map(video => (
                            <section key={video.id.videoId}>
                                <button onClick={ () => handleOpenModalView(video.id.videoId) }>
                                    <CardVideo video={video} />
                                </button>
                            </section>
                        ))}
                        </div>
                    { modalVisible && (
                        <ModalVideo 
                        
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        video={modalItem}

                        />
                    )}    
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
                            <div className={styles.busca}>
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
                            </div>
                            
                        </form>
                    </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    
    return {
        props:{
            
        }
    }
})
