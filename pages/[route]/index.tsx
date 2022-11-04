import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './SignInForm.module.scss';
import Card from '../../common/components/Card/Card';
import CardContent from '../../common/components/Card/CardContent/CardContent';
import Input from '../../common/components/Input/Input';
import Link from '../../common/components/Link/Link';
import bgImg from '../../public/backgrounds/bg-desk-light.jpg';
import Button from '../../common/components/Button/Button';

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
export default function Page() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
  const [loginData, setloginData] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
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
          {router.asPath === '/register' ? (
            <>
              <CardContent>
                <form className={styles.form}>
                  <h1>Register</h1>
                  <Input
                    title="E-mail"
                    id="email"
                    value={registerData.email}
                    onChange={(e: string) => {
                      setRegisterData((values) => ({
                        ...values,
                        email: e,
                      }));
                    }}
                  ></Input>
                  <Input
                    title="Password"
                    id="password"
                    type="password"
                    onChange={(e: string) => {
                      setRegisterData((values) => ({
                        ...values,
                        password: e,
                      }));
                    }}
                  ></Input>
                  <div className={styles['cta-wrapper']}>
                    <Button
                      fillType="filled"
                      size="lg"
                      onClick={(e: Event) => {
                        e.preventDefault();
                        fetch('/api/auth/register', {
                          method: 'POST',
                          body: JSON.stringify(registerData),
                          headers: {
                            'content-type': 'application/json',
                          },
                        }).then((res) => console.log(res)); // TODO handle response
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
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardContent>
                <form className={styles.form}>
                  <h1>Login</h1>
                  <Input
                    title="E-mail"
                    id="email"
                    value={loginData.email}
                    onChange={(e: string) => {
                      setloginData((values) => ({
                        ...values,
                        email: e,
                      }));
                    }}
                  ></Input>
                  <Input
                    type="password"
                    title="Password"
                    id="password"
                    value={loginData.password}
                    onChange={(e: string) => {
                      setloginData((values) => ({
                        ...values,
                        password: e,
                      }));
                    }}
                  ></Input>
                  <div className={styles['cta-wrapper']}>
                    <Button
                      fillType="filled"
                      size="lg"
                      color="primary"
                      onClick={(e: Event) => {
                        e.preventDefault();
                        fetch('/api/auth/login', {
                          method: 'POST',
                          body: JSON.stringify(loginData),
                          headers: {
                            'content-type': 'application/json',
                          },
                        }).then((res) =>
                          res.json().then((data) => console.log(data)),
                        ); // TODO handle response
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
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
