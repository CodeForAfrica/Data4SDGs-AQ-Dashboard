import React from 'react';

import styles from './BodyContent.module.css';

const BodyContent = ({ children }) => {
  return (
    <div className={`${styles.bodyContent} bg-white dark:bg-gray-900`}>
      <header className="hidden lg:flex h-10 pl-8 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 relative">
        <button
          type="button"
          className="text-sm text-white bg-pink p-1 px-2 rounded-1 uppercase"
        >
          Some Link
        </button>
      </header>
      <div className="lg:pl-8 pb-8">{children}</div>
    </div>
  );
};

export default BodyContent;
