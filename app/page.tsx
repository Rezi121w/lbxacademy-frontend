'use client'

import styles from "./page.module.css";
import { useRecoilState,} from "recoil";
import { useEffect } from "react";
// User-Info //
import { userInfoState } from '@/app/atoms';
// Components //
import LeftPanel from "./components/leftPanel/leftPanel";
import TopPanel from "./components/topPanel/topPanel";
import Technologies from "./components/technologies/technologies";

export default function Home() {

  return (
    <main className={styles.mainWrapper}>
        <LeftPanel />

        <div className={styles.rightWrapper}>
          <TopPanel />

          <div className={styles.rightBottomWrapper}>
            <Technologies />
          </div>

        </div>
    </main>
  );
}
