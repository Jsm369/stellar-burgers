import { FC } from 'react';

import styles from './not-fount-404.module.css';
import { Link } from 'react-router-dom';

export const NotFound404: FC = () => (
  <div className={styles.container}>
    <h3 className={`pb-6 text text_type_main-large`}>
      Страница не найдена. Ошибка 404.
    </h3>
    <Link className={styles.link} to='/'>
      Вернуться на главную
    </Link>
  </div>
);
