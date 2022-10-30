import styles from './Register.module.scss';
import Image from 'next/image';
import Card from '../../common/components/Card/Card';
import CardContent from '../../common/components/Card/CardContent/CardContent';
import CardFooter from '../../common/components/Card/CardFooter/CardFooter';
import CardHeader from '../../common/components/Card/CardHeader/CardHeader';
import { CardFooterActionsSchema } from '../../common/components/Card/CardFooter/CardFooter.schema';
import Input from '../../common/components/Input/Input';
import Head from 'next/head';

export default function Register() {
  const cardFooterActions: CardFooterActionsSchema[] = [
    { text: 'Back', fillType: 'regular' },
    { text: 'Register', fillType: 'filled' },
  ];
  return (
    <>
      <Head>
        <title>Habitea - Register</title>
      </Head>
      <div className={styles.register}>
        <div className={styles.register__image}>
          <Image src="/register.jpg" alt="register" fill></Image>{' '}
        </div>

        <div className={styles['register__form-container']}>
          <Card maxWidth="560px" appearance="elevated" color="primary">
            <CardHeader title="Register"></CardHeader>
            <CardContent>
              <form className={styles.register__form}>
                <Input title="Login" id="login"></Input>
                <Input title="Password" id="password"></Input>
                <Input title="Name" id="name"></Input>
                <Input title="Surname" id="surname"></Input>
                <Input title="E-mail" id="email"></Input>
              </form>
            </CardContent>
            <CardFooter
              buttonColor="primary"
              actions={cardFooterActions}
            ></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
