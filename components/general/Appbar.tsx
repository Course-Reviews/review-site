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
            <span className={'text-gray-700 font-semibold'}>Course Reviews</span>
          </a>
        </Link>
        <div className={'flex'}>
          <SearchButton className={'sm:hidden'} /> <NavSearch className={'hidden sm:flex'} />
          {!hasResolved ? (
            'e'
          ) : user ? (
            <NavAccount/>
          ) : (
            <Link href='/account/signin'>
              <a>
                <Button>Sign In</Button>
              </a>
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Appbar;
