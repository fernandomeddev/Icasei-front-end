import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/medlogo.png';

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link';

export default function Sinup() {
  return (
    <>
      <Head>
        <title>
        Register Now | MED TI
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Medeiros Solutions" />

        <div className={styles.login}>
          <form action="">
            <Input
              placeholder='Full Name'
            />
            <Input
              placeholder='E-Mail'
            />
            <Button 
              type="submit" 
              loading={false}
            >
              Register
            </Button>
          </form>
          <p className={styles.text}>Do you have account?</p>
          <Link href="/">
            <a className={styles.text}> Login </a>
          </Link>
        </div>
      </div>
    </>
  )
}
