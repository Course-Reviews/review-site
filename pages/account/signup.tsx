import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { object, SchemaOf, string } from 'yup';
import Button from '../../components/atom/Button';
import Card from '../../components/atom/Card';
import FormGroup from '../../components/atom/FormGroup';
import IconButton from '../../components/atom/IconButton';
import Input from '../../components/atom/Input';
import { AuthContext } from '../../components/general/CognitoAuthProvider';

interface FormFields {
  username: string;
  email: string;
  password: string;
}

const schema: SchemaOf<FormFields> = object().shape({
  username: string().required('Please enter a username'),
  email: string().required('Please enter an email'),
  password: string()
    .required('Please enter a password')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least 1 number')
    .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter'),
});

const Signin: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  const auth = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  const handleValidSubmit: SubmitHandler<FormFields> = async ({ username, email, password }) => {
    try {
      const res = await auth.signUp({
        username,
        password,
        email,
      });

      router.push('/account/reviews');
    } catch ({ message }) {
      if (message.match(/EmailExistsException/)) {
        setError('email', { message: 'This email is already in use' });
      } else if (message.match(/User\salready\sexists/)) {
        setError('username', { message: 'That username is taken' });
      } else {
        setError('password', { message });
      }
    }
  };

  if (auth.hasResolved && auth.user) {
    // This lets us redirect the user back to what they were doing before authentication
    const destination = sessionStorage.getItem('authRedirect') || '/account/reviews';
    sessionStorage.removeItem('authRedirect');
    router.push(destination);
  }

  return (
    <main
      className={
        '-mt-2 pb-24 flex-grow bg-hero bg-cover bg-center -mb-32 md:-mb-16 flex flex-col items-center justify-center'
      }
      itemScope={true}
      itemType={'https://schema.org/UserReview'}
    >
      <Head>
        <title>Sign up to CourseReview</title>
        <meta name='description' content={'View you profile and account.'} />
        <meta name='robots' content='index,follow' />
      </Head>
      <Card className={'mx-4 self-stretch md:self-center sm:w-96'}>
        <Card.Body className={'flex flex-col'}>
          <h1 className={'text-2xl font-semibold text-gray-700 text-center'}>Sign Up</h1>
          <form onSubmit={handleSubmit(handleValidSubmit)}>
            <FormGroup label='Username' error={errors.username}>
              <Input {...register('username')} autoComplete='signup username' />
            </FormGroup>{' '}
            <FormGroup label='Email' error={errors.email}>
              <Input
                {...register('email')}
                type='email'
                placeholder='example@mail.com'
                autoComplete='signup email'
              />
            </FormGroup>
            <FormGroup label='Password' error={errors.password}>
              <div className={'relative'}>
                <Input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  autoComplete='signup new-password'
                  placeholder='password'
                />
                <div className={'absolute right-0 top-0 z-10 m-2 mx-4'}>
                  <IconButton
                    icon={showPass ? FiEye : FiEyeOff}
                    onClick={() => setShowPass((v) => !v)}
                    variant='none'
                    type='button'
                  />
                </div>
              </div>
            </FormGroup>
            {/* {serverError && <span className={'text-sm text-danger-500 my-2'}>{serverError}</span>} */}
            <Button block className={'mt-4'}>
              Sign up
            </Button>
          </form>
          <p className={'text-gray-700 mx-auto text-sm mt-4'}>Already have an account?</p>
          <Link href='signin'>
            <a className={'mx-auto'}>
              <button className={'font-semibold text-primary-500 w-auto'}>Sign in instead</button>
            </a>
          </Link>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Signin;
