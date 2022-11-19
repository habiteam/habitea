import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
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
// TODO code order, cleanup, and refactor
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

  /**
   * @see https://firebase.google.com/docs/auth/web/google-signin
   */
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
        console.log(result, token);
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
  /**
   * TODO doesn't seem to work too good, needs more love
   * @see https://firebase.google.com/docs/auth/web/github-auth
   */
  function githubSignIn() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const { user } = result;
        // ...
        console.log(result, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
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
                {/* TODO stop typescript from being a whiny bitch */}
                <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>&nbsp; Sign
                in with Googoo
              </Button>
              <Button
                fillType={'outlined'}
                size="lg"
                onClick={(e: Event) => {
                  e.preventDefault();
                  githubSignIn();
                }}
              >
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>&nbsp; Sign
                in with Github
              </Button>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
