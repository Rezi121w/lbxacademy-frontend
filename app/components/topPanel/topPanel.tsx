import styles from './topPanel.module.css';
import Image from 'next/image';
import Link from 'next/link';
// User_INFO //
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/app/atoms';
import dayjs from 'dayjs';


interface MonthsInGeorgian {
    [key: number]: string;
}

export default function topPanel() {
    const [user, _] = useRecoilState<any>(userInfoState);

    const todayDate = dayjs().format("D");
    const monthIndex = dayjs().month();

    const monthsInGeorgian: MonthsInGeorgian = {
        0: 'იანვარი', // January
        1: 'თებერვალი', // February
        2: 'მარტი', // March
        3: 'აპრილი', // April
        4: 'მაისი', // May
        5: 'ივნისი', // June
        6: 'ივლისი', // July
        7: 'აგვისტო', // August
        8: 'სექტემბერი', // September
        9: 'ოქტომბერი', // October
        10: 'ნოემბერი', // November
        11: 'დეკემბერი' // December
    };

    return(
        <div className={styles.main}>
            <div className={styles.time}>
                <Image src="/topmenu/calendar.svg" alt='calendar' width={20} height={20}/>
                <span>{todayDate} {monthsInGeorgian[monthIndex]}</span>
            </div>

            <div className={styles.profile}>
                <img src={user && user.profileImage ? user.profileImage : "/default/user.jpg"} />
                <span>{ user ? user.firstName : "null" }</span>
            </div>

        </div>
    )
}