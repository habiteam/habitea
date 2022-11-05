import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './SignInForm.module.scss';
import Card from '../../common/components/Card/Card';
import CardContent from '../../common/components/Card/CardContent/CardContent';
import Input from '../../common/components/Input/Input';
import Link from '../../common/components/Link/Link';
import bgImg from '../../public/backgrounds/bg-desk-light.jpg';
import Button from '../../common/components/Button/Button';
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
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {
        'content-type': 'application/json',
      },
    }).then((response: Response) => {
      if (response.status === 200) {
        router.push('/login');
      } else {
        console.log(response); // TODO: notification system (probably some form snackbar or toast)
      }
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
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'content-type': 'application/json',
      },
    }).then((response: Response) => {
      if (response.status === 200) {
        router.push('/app');
      } else {
        console.log(response); // TODO: notification system (probably some form snackbar or toast)
      }
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

  return (
    <main>
      <Image
        className={styles['background-image']}
        src={bgImg}
        alt="register"
        placeholder="blur"
        fill
      ></Image>
      <div className={styles['form-wrapper']}>
        <Card maxWidth="560px" elevated color="primary">
          <CardContent>
            <form className={styles.form}>
              {router.asPath === '/register' ? (
                <RegisterForm router={router} />
              ) : (
                <LoginForm router={router} />
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
