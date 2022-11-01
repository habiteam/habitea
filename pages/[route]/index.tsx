import { useRouter } from 'next/router';
import Image from 'next/image';
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
                  <Input title="Name" id="name"></Input>
                  <Input title="Surname" id="surname"></Input>
                  <Input title="E-mail" id="email"></Input>
                  <div className={styles['cta-wrapper']}>
                    <Button fillType="filled" size="lg">
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
                  <Input title="E-mail" id="email"></Input>
                  <Input type="password" title="Password" id="password"></Input>
                  <div className={styles['cta-wrapper']}>
                    <Button fillType="filled" size="lg" color="primary">
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
