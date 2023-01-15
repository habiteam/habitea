import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from '@commonComponents/Card/Card';
import Input from '@commonComponents/Input/Input';
import CardContent from '@commonComponents/Card/CardContent/CardContent';
import Link from '@commonComponents/Link/Link';
import Button from '@commonComponents/Button/Button';
import bgImg from '@public/backgrounds/bg-desk-light.jpg';
import { auth } from '@services/firebase';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FirebaseError } from 'firebase/app';
import getErrorMessage from '@utils/firebase-error';
import Head from 'next/head';
import { useAddNotification } from '@utils/notifications';
import styles from './SignInForm.module.scss';
import { EmailAuthData } from '../../common/schemas/email-auth-data';

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

export function RegisterForm() {
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

  const addNotifcation = useAddNotification();

  function registerUser() {
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password,
    )
      .then(() => {
        addNotifcation({ message: 'User registered', type: 'success' });
      })
      .catch((error) => {
        addNotifcation({ message: getErrorMessage(error), type: 'danger' });
      });
  }

  return (
    <>
      <Head>
        <title>Sign up - Habitea</title>
      </Head>
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
          color="primary"
          size="lg"
          onClick={(e: Event) => {
            e.preventDefault();
            registerUser();
          }}
        >
          Sign up
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

export function LoginForm() {
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

  const addNotifcation = useAddNotification();

  function loginUser() {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(() => {})
      .catch((error: FirebaseError) => {
        addNotifcation({ message: getErrorMessage(error), type: 'danger' });
      });
  }

  return (
    <>
      <Head>
        <title>Login - Habitea</title>
      </Head>
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
  const addNotifcation = useAddNotification();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log(user);
        router.push('/app/home');
      }
    });

    return () => unsubscribe();
  }, []);

  const right = { translateX: '-430px' };
  const left = { translateX: '430px' };

  const transition = useTransition(router.asPath === '/register', {
    from: router.asPath === '/register' ? right : left,
    enter: { translateX: '0px' },
    leave: router.asPath === '/register' ? left : right,
    exitBeforeEnter: true,
  });

  /**
   * @see https://firebase.google.com/docs/auth/web/google-signin
   */
  function goolgeSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).catch((error) => {
      addNotifcation({ message: getErrorMessage(error), type: 'danger' });
    });
  }
  /**
   * @see https://firebase.google.com/docs/auth/web/github-auth
   */
  function githubSignIn() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      addNotifcation({ message: getErrorMessage(error), type: 'danger' });
    });
  }

  return (
    <main className={styles.main}>
      <Image
        className={styles['background-image']}
        src={bgImg}
        alt="background image"
        placeholder="blur"
      ></Image>
      <div className={styles['page-content-wrapper']}>
        <Card maxWidth="560px" elevated color="primary">
          <CardContent>
            <div className={styles['form-wrapper']}>
              <Button
                fillType={'outlined'}
                size="lg"
                onClick={(e: Event) => {
                  e.preventDefault();
                  goolgeSignIn();
                }}
              >
                <FontAwesomeIcon icon={faGoogle as IconProp}></FontAwesomeIcon>
                &nbsp; Sign in with Google
              </Button>
              <Button
                fillType={'outlined'}
                size="lg"
                onClick={(e: Event) => {
                  e.preventDefault();
                  githubSignIn();
                }}
              >
                <FontAwesomeIcon icon={faGithub as IconProp}></FontAwesomeIcon>
                &nbsp; Sign in with Github
              </Button>
              {transition((style, item) =>
                item ? (
                  <animated.form style={style} className={styles.form}>
                    <RegisterForm />
                  </animated.form>
                ) : (
                  <animated.form style={style} className={styles.form}>
                    <LoginForm />
                  </animated.form>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
