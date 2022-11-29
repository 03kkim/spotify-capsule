import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { Button, Stack } from '@mui/material'
import Login from '../components/login';
import { getProviders } from "next-auth/react"

export default function Home({ providers }) {
  return (
    <div>
      <Head>
        <title>Spotify Time Capsule</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
      <Stack spacing={14} alignItems="center">
        <h1 className={styles.title}>
          Welcome to Spotify Capsule Thing!
        </h1>
        <Login providers={providers}></Login>

        {/* <Link href="/encapsulate">
          <Button variant="contained"  
                  size="large"
                  onClick={() => {
                    alert('This should take us to the Spotify Auth Login');
                  }}
                  sx={{
                    backgroundColor: "#1DB954",
                    '&:hover': {backgroundColor: '#33c065'},
                    color: "white",
          }}>
            Login to Spotify
          </Button>
        </Link> */}

        <p className={styles.description}>
        UNDER CONSTRUCTION
        </p>
        
      </Stack>
       
        
      </main>
      

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}