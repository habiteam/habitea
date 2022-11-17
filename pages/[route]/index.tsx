import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import styles from './SignInForm.module.scss';
import Card from '../../common/components/Card/Card';
import CardContent from '../../common/components/Card/CardContent/CardContent';
import Input from '../../common/components/Input/Input';
import Link from '../../common/components/Link/Link';
import bgImg from '../../public/backgrounds/bg-desk-light.jpg';
import Button from '../../common/components/Button/Button';
import { EmailAuthData } from '../../common/schemas/email-auth-data';
import { auth } from '../../common/services/firebase';

export async function getStaticPaths() {
  return {
    paths: [{ params: { route: 'register' } }, { params: { route: 'login' } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export function RegisterForm({ router }: { router: NextRouter }) {
  const [registerData, setRegisterData] = useState<EmailAuthData>({
    email: '',
    password: '',
  });

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRegisterData((values: EmailAuthData) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  function registerUser() {
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password,
    )
      .then((user) => {
        // TODO handle register
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function goolgeSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <>
      <h1>Register</h1>
      <Input
        title="E-mail"
        id="email"
        name="email"
        value={registerData.email}
        onChange={handleFormChange}
      ></Input>
      <Input
        title="Password"
        id="password"
        name="password"
        type="password"
        onChange={handleFormChange}
      ></Input>
      <div className={styles['cta-wrapper']}>
        <Button
          fillType="filled"
          size="lg"
          onClick={(e: Event) => {
            e.preventDefault();
            registerUser();
          }}
        >
          Sign up
        </Button>
        <Button
          fillType={'filled'}
          size="lg"
          onClick={(e: Event) => {
            e.preventDefault();
            goolgeSignIn();
          }}
        >
          Sign in with googoo
        </Button>
      </div>
      <span className={styles['form-footer']}>
        Already have an account?
        <Link href="/login" color="info">
          Log in!
        </Link>
      </span>
    </>
  );
}

export function LoginForm({ router }: { router: NextRouter }) {
  const [loginData, setLoginData] = useState<EmailAuthData>({
    email: '',
    password: '',
  });
  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginData((values: EmailAuthData) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  function loginUser() {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((user) => {
        router.push('/app');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <h1>Login</h1>
      <Input
        title="E-mail"
        id="email"
        name="email"
        value={loginData.email}
        onChange={handleFormChange}
      ></Input>
      <Input
        type="password"
        title="Password"
        id="password"
        name="password"
        value={loginData.password}
        onChange={handleFormChange}
      ></Input>
      <div className={styles['cta-wrapper']}>
        <Button
          fillType="filled"
          size="lg"
          color="primary"
          onClick={(e: Event) => {
            e.preventDefault();
            loginUser();
          }}
        >
          Log in
        </Button>
      </div>
      <span className={styles['form-footer']}>
        Don&apos;t have an account?
        <Link href="/register" color="info">
          Sign&nbsp;up&nbsp;now!
        </Link>
      </span>
    </>
  );
}

export default function Page() {
  const router = useRouter();

  const right = { translateX: '-430px' };
  const left = { translateX: '430px' };

  const transition = useTransition(router.asPath === '/register', {
    from: router.asPath === '/register' ? right : left,
    enter: { translateX: '0px' },
    leave: router.asPath === '/register' ? left : right,
    exitBeforeEnter: true,
  });

  return (
    <main>
      <Image
        className={styles['background-image']}
        src={bgImg}
        alt="background image"
        placeholder="blur"
        fill
      ></Image>
      <div className={styles['form-wrapper']}>
        <Card maxWidth="560px" elevated color="primary">
          <CardContent>
            {transition((style, item) =>
              item ? (
                <animated.form style={style} className={styles.form}>
                  <RegisterForm router={router} />
                </animated.form>
              ) : (
                <animated.form style={style} className={styles.form}>
                  <LoginForm router={router} />
                </animated.form>
              ),
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
