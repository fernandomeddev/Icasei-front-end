import Modal from "react-modal"
import styles from './style.module.scss'

import { FiX } from 'react-icons/fi'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'

import { VideoProps } from '../../pages/search'

interface ModalVideoProps{
    isOpen: boolean;
    onRequestClose: () => void;
    video: VideoProps
}
export function ModalVideo({ isOpen, onRequestClose, video}: ModalVideoProps) {

    const customStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }

    return(
        <Modal isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        >
        
        <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border:0 }}
        >
        
        <FiX size={45} color="#f34748" />

        </button>

        <div className={styles.container}>
            <h2>{video[0].snippet.title}</h2>
            
            <section>
            <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${video[0].id}`} title="OLIVER STUENKEL E PROFESSOR HOC - Flow #123" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </section>

            <span>
                <p>{video[0].snippet.description}</p>
            </span>

            <div>
                <span>{video[0].statistics.viewCount }</span> <span>|  visualizaçãoes....</span>
            </div>

            <div className={styles.likes}>
                <span>
                <AiFillLike size={16} color="#fff" />
                <span>{video[0].statistics.likeCount}</span>
                </span>
                <span>
                <AiFillDislike size={16} color="#fff" />
                <span>0</span>
                </span>
                
            </div>
        </div>
        </Modal>
    )
}