import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
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
    .min(8, 'Password must be at least 8 characters'),
});

const Signin: React.FC = () => {
  const [showPass, setShowPass] = useState(false);

  const auth = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  const handleValidSubmit: SubmitHandler<FormFields> = async ({ username, email, password }) => {
    try {
      await auth.signUp({
        username,
        password,
        email,
      });
      router.push('/account')
    } catch ({message}) {
      setError('password', message)
    }
  };

  if(auth.hasResolved && auth.user){
    router.push('/account')
  }

  return (
    <main
      className={
        '-mt-2 pb-24 flex-grow bg-hero bg-cover bg-center -mb-16 flex flex-col items-center justify-center'
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
        <Card.Body>
          <h1 className={'text-2xl font-semibold text-gray-700 text-center'}>Sign Up</h1>
          <form onSubmit={handleSubmit(handleValidSubmit)}>
            <FormGroup label='Username' error={errors.username}>
              <Input {...register('username')} />
            </FormGroup>{' '}
            <FormGroup label='Email' error={errors.email}>
              <Input {...register('email')} type='email' />
            </FormGroup>
            <FormGroup label='Password' error={errors.password}>
              <div className={'relative'}>
                <Input {...register('password')} type={showPass ? 'text' : 'password'} />
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
              Sign in
            </Button>
          </form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Signin;
