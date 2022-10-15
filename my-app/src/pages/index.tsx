import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/medlogo.png';

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext} from '../contexts/AuthContext'

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [ email, setEmail] = useState('')
  const [ loading , setLoading ] = useState(false)

  async function handleLogin(event:FormEvent) {
    event.preventDefault();

    let data = {
      email
    }

    await signIn(data)
  }
  return (
    <>
      <Head>
        <title>
          Login | MED TI
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Medeiros Solutions" />

        <div className={styles.login}>
          <form onSubmit={ handleLogin }>
            <Input
              placeholder='E-Mail'
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />
            <Button 
              type="submit" 
              loading={false}
            >
              Login
            </Button>
          </form>
          <Link href="/signup">
            <a className={styles.text}>Register now</a>
          </Link>
        </div>
      </div>
    </>
  )
}
