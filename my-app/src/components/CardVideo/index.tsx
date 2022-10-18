import styles from './style.module.scss';
import { VideoProps } from '../../pages/search'

interface CardVideoProps{
    video: VideoProps
}

export function CardVideo({ video }: CardVideoProps){
    return(
        <>
        <div className={styles.container}>
            <div className={styles.title}>
                <h4>{video.snippet.title}</h4>
            </div>
            <div className={styles.content}>
                <img src={video.snippet.thumbnails.high.url}  alt="thumbnails" />
            </div>
            
        </div>
        </>
    )
}