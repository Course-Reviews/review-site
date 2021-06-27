import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import BreadCrumbs from '../components/atom/BreadCrumbs';
import Button from '../components/atom/Button';
import Card from '../components/atom/Card';
import StarRating from '../components/atom/StarRating';
import logo from '../public/vercel.svg'

const Home = () => (
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Please Work</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto py-32'>
        <BreadCrumbs>
          <BreadCrumbs.Item href='/'>Home</BreadCrumbs.Item>
          <BreadCrumbs.Item href='/courses'>Courses</BreadCrumbs.Item>
          <BreadCrumbs.Item href='/courses/softeng351'>Home</BreadCrumbs.Item>
        </BreadCrumbs>
        <Card className={'w-48'}>
          <Card.Body>
            <Card.Title>This is a card</Card.Title>
            <Card.Text>This is some text on a card</Card.Text>
            <StarRating rating={2.5}/>
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
