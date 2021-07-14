import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, SchemaOf, string } from 'yup';
import Button from '../../components/atom/Button';
import Card from '../../components/atom/Card';
import FormGroup from '../../components/atom/FormGroup';
import Input from '../../components/atom/Input';
import { AuthContext } from '../../components/general/CognitoAuthProvider';

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
  const router = useRouter();

  const {handleSubmit, register, formState: {errors}, setError} = useForm<FormFields>({
    resolver: yupResolver(schema)
  })

  const handleValidSubmit: SubmitHandler<FormFields> = async ({username, password}) => {
    try {
      await auth.signIn({username, password});
      router.push('/account');

    } catch ({message}) {
      setError('password',{message});
    }
  }

  if(auth.hasResolved && auth.user){
    // This lets us redirect the user back to what they were doing before authentication
    const destination = sessionStorage.getItem('authRedirect') || '/account/reviews';
    sessionStorage.removeItem('authRedirect')
    router.push(destination)
  }

  return (
  <main
    className={'-mt-2 pb-24 flex-grow bg-hero bg-cover bg-center -mb-32 md:-mb-16 flex flex-col items-center justify-center'}
    itemScope={true}
    itemType={'https://schema.org/UserReview'}
  >
    <Head>
      <title>Sign in to CourseReview</title>
      <meta name='description' content={'View you profile and account.'} />
      <meta name='robots' content='index,follow' />
    </Head>
    <Card className={'mx-4 self-stretch md:self-center sm:w-96'}>
      <Card.Body className={'flex flex-col'}>
        <h1 className={'text-2xl font-semibold text-gray-700 text-center'}>Sign In</h1>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <FormGroup label='Username' error={errors.username}>
            <Input {...register('username')}/>
          </FormGroup>
          <FormGroup label='Password' error={errors.password}>
            <Input {...register('password')} type='password' autoComplete='current-password'/>
          </FormGroup>
          {/* {serverError && <span className={'text-sm text-danger-500 my-2'}>{serverError}</span>} */}
          <Button block className={'mt-4'}>Sign in</Button>
        </form>
        <p className={'text-gray-700 mx-auto text-sm mt-4'}>{'Don\'t have an account?'}</p>
              <Link href='signup'>
                <a className={'mx-auto'}>
                  <button className={'font-semibold text-primary-500 w-auto'}>Sign in instead</button>
                </a>
              </Link>
      </Card.Body>
    </Card>
  </main>
)
};

export default Signin;
