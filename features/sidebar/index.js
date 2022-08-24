import React from 'react';
import Link from 'next/link';
import { FaBars, FaChartBar } from "react-icons/fa";
import styles from "../../styles/sidebar.module.scss";

const Sidebar = () => {
    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <div>
                    <FaBars/>
                </div>
            </header>
            <aside className={styles.sidebar}>
                <div className={styles.vertical}>
                    <div className={styles.horizontal}>
                        <Link href="#!">
                            <a>
                                <i>
                                    <FaChartBar />
                                </i>
                                <span>Doanh thu bán hàng</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </aside>
            <h3>Content</h3>
        </div>
    );
};

export default Sidebar;