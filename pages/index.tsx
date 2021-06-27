import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import logo from '../public/vercel.svg'

const Home = () => (
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Please Work</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto py-32'>
        <Card className={'w-48'}>
          <Card.Body>
            <Card.Title>This is a card</Card.Title>
            <Card.Text>This is some text on a card</Card.Text>
            <Button grow>Click me!</Button>
          </Card.Body>
        </Card>

      </main>

      <footer className='flex items-center justify-center w-full h-24 border-t'>
        <a
          className='flex items-center justify-center'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src={logo} alt='Vercel Logo' className='h-4 ml-2' />
        </a>
      </footer>
    </div>
  )

export default Home;
