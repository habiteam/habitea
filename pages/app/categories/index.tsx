import { getCategoriesLayout } from '@components/CategoriesLayout/CategoriesLayout';
import styles from './Categories.module.scss';

export default function Categories() {
  return (
    <div className={styles.categories}>
      <div>Select or create new category</div>
    </div>
  );
}

Categories.getLayout = getCategoriesLayout;
