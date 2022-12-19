import { getCategoriesLayout } from '@components/CategoriesLayout/CategoriesLayout';
import Head from 'next/head';
import styles from './Categories.module.scss';

export default function Categories() {
  return (
    <div className={styles.categories}>
      <Head>
        <title>Categories - Habitea</title>
      </Head>
      <div>Select or create new category</div>
    </div>
  );
}

Categories.getLayout = getCategoriesLayout;
