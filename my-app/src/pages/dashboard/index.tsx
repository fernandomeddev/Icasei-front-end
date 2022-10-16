import { canSSRAuth } from './../../utils/canSSRAuth';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logo2 from '../../../public/med2.png';

import { Header } from '../../components/ui/header';
import { Input } from '../../components/ui/Input';

export default function Dashboard(){

    return (
        <>
        <Head>
            <title> Dashboard </title>
        </Head>
        <div>
            <Header />
        </div>
    
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props:{}
    }
})