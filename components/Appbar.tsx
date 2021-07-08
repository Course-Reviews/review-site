
import Link from 'next/link';
import React, { useContext } from 'react';
import Button from './atom/Button';
import Container from './atom/Container';
import Navbar from './atom/Navbar';
import { AuthContext } from './CognitoAuthProvider';
import Logo from './Logo';
import NavSearch from './NavSearch';
import SearchButton from './SearchButton';

const Appbar: React.FC = () => {
  const { hasResolved, user, signOut } = useContext(AuthContext);

  console.log(user);

  return (
    <Navbar>
      <Container className={'flex justify-between'}>
        <Link href='/'>
          <a className={'flex items-center h-8'}>
            <Logo className={'h-12 w-12 mx-4'} />
            <span className={'text-gray-700 font-semibold'}>Course Reviews</span>
          </a>
        </Link>
        <div className={'flex'}>
          <SearchButton className={'sm:hidden'} /> <NavSearch className={'hidden sm:flex'} />
          {!hasResolved ? (
            'e'
          ) : user ? (
            <div className={'flex'}>
              <span>Signed in as {user.username}</span>
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            <span>not logged in :(</span>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Appbar;
