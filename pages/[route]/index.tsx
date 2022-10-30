import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './SignInForm.module.scss';
import Card from '../../common/components/Card/Card';
import CardContent from '../../common/components/Card/CardContent/CardContent';
import CardFooter from '../../common/components/Card/CardFooter/CardFooter';
import Input from '../../common/components/Input/Input';
import Link from '../../common/components/Link/Link';

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
  return (
    <main>
      <Image
        className={styles['background-image']}
        src="/register.jpg"
        alt="register"
        fill
      ></Image>
      <div className={styles['form-wrapper']}>
        <Card maxWidth="560px" appearance="elevated" color="primary">
          {router.asPath === '/register' ? (
            <>
              <CardContent>
                <h1>Register</h1>
                <form className={styles.form}>
                  <Input title="Name" id="name"></Input>
                  <Input title="Surname" id="surname"></Input>
                  <Input title="E-mail" id="email"></Input>
                </form>
              </CardContent>
              <CardFooter
                buttonColor="primary"
                actions={[{ text: 'Login', fillType: 'filled' }]}
              ></CardFooter>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                Already have an account?
                <Link href="/login" color="info">
                  Log in!
                </Link>
              </div>
            </>
          ) : (
            <>
              <CardContent>
                <h1>Login</h1>
                <form className={styles.form}>
                  <Input title="E-mail" id="email"></Input>
                  <Input type="password" title="Password" id="password"></Input>
                </form>
              </CardContent>
              <CardFooter
                buttonColor="primary"
                actions={[{ text: 'Login', fillType: 'filled' }]}
              ></CardFooter>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                Don&apos;t have an account?
                <Link href="/register" color="info">
                  Sign up now!
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
