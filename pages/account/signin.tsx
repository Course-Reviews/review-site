import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, SchemaOf, string } from 'yup';
import Button from '../../components/atom/Button';
import Card from '../../components/atom/Card';
import FormGroup from '../../components/atom/FormGroup';
import Input from '../../components/atom/Input';
import { AuthContext } from '../../components/CognitoAuthProvider';

interface FormFields {
  username: string;
  password: string;
}

const schema: SchemaOf<FormFields> = object().shape({
  username: string().required('Please enter a username'),
  password: string().required('Please enter a password')
});

const Signin: React.FC = () => {

  const auth = useContext(AuthContext);

  const {handleSubmit, register, formState: {errors}, setError} = useForm<FormFields>({
    resolver: yupResolver(schema)
  })

  const handleValidSubmit: SubmitHandler<FormFields> = async ({username, password}) => {
    try {
      await auth.signIn({username, password});
    } catch ({message}) {
      setError('password',{message});
    }
  }

  return (
  <main
    className={'-mt-2 pb-24 flex-grow bg-hero bg-cover bg-center -mb-16 flex flex-col items-center justify-center'}
    itemScope={true}
    itemType={'https://schema.org/UserReview'}
  >
    <Head>
      <title>Sign in to CourseReview</title>
      <meta name='description' content={'View you profile and account.'} />
      <meta name='robots' content='index,follow' />
    </Head>
    <Card className={'mx-4 self-stretch md:self-center sm:w-96'}>
      <Card.Body>
        <h1 className={'text-2xl font-semibold text-gray-700 text-center'}>Sign In</h1>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <FormGroup label='Username' error={errors.username}>
            <Input {...register('username')}/>
          </FormGroup>
          <FormGroup label='Password' error={errors.password}>
            <Input {...register('password')} type='password'/>
          </FormGroup>
          {/* {serverError && <span className={'text-sm text-danger-500 my-2'}>{serverError}</span>} */}
          <Button block className={'mt-4'}>Sign in</Button>
        </form>
      </Card.Body>
    </Card>
  </main>
)
};

export default Signin;
