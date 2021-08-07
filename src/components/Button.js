import React from 'react';

import styles from '../styles/components/Button.module.css';

export default function Button(props) {
  return <button className={styles.button} {...props} />;
}
