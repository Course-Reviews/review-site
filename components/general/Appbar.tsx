import Link from 'next/link';
import React, { useContext } from 'react';
import Button from '../atom/Button';
import Container from '../atom/Container';
import Navbar from '../atom/Navbar';
import { AuthContext } from './CognitoAuthProvider';
import Logo from './Logo';
import NavSearch from '../search/NavSearch';
import SearchButton from '../search/SearchButton';
import NavAccount from './NavAccount';

const Appbar: React.FC = () => {
  const { hasResolved, user, signOut } = useContext(AuthContext);

  return (
    <Navbar>
      <Container className={'flex justify-between'}>
        <Link href='/'>
          <a className={'flex items-center'}>
            <Logo className={'h-12 w-12 mx-4'} />
            <span className={'text-gray-700 font-semibold hidden sm:block'}>Course Reviews</span>
          </a>
        </Link>
        <div className={'flex items-center'}>
          <SearchButton className={'sm:hidden'} /> <NavSearch className={'hidden sm:flex'} />
          {!hasResolved ? (
            'e'
          ) : user ? (
            <NavAccount/>
          ) : (
            <>
            <Link href='/account/signup'>
              <a className={'ml-2'}>
              <Button size='sm' className={'md:hidden'}>Sign Up</Button>
                <Button className={'hidden md:block'}>Sign Up</Button>
              </a>
            </Link>
            <Link href='/account/signin'>
              <a className={'ml-2'}>
                <Button outline size='sm' className={'md:hidden'}>Sign In</Button>
                <Button outline className={'hidden md:block'}>Sign In</Button>
              </a>
            </Link>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Appbar;
