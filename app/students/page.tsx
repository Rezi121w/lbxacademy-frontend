'use client'

import styles from "./page.module.css";

// Components //
import LeftPanel from ".././components/leftPanel/leftPanel";
import TopPanel from ".././components/topPanel/topPanel";
import StudentsList from '.././components/studentsList/studentsList';

export default function Home() {


  return (
    <>

    <main className={styles.mainWrapper}>
        <LeftPanel />
        <div className={styles.rightWrapper}>
          <TopPanel />
          <StudentsList />
        </div>
    </main>
    </>
  );
}
