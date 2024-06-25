'use client'

import styles from "./page.module.css";
import LoginPanel from "../components/loginPanel/loginPanel"
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <LoginPanel router={router} />
    </main>
  );
}
