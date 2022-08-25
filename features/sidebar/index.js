import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { FaBars, FaHome, FaChartBar } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import styles from "../../styles/sidebar.module.scss";

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    return (
        <div className={`${styles.main} ${show ? styles.spaceToggle : null}`}>
            <header className={`${styles.header} ${show ? styles.spaceToggle : null}`}>
                <div className={styles.toggle} onClick={() => setShow(!show)}>
                    <FaBars />
                </div>
            </header>
            <aside className={`${styles.sidebar} ${show ? styles.show : null}`}>
                <nav className={styles.nav}>
                    <div className={styles.wrap}>
                        <Link href="#!">
                            <a className={styles.navLogo}>
                                <i className={styles.navLogoIcon}>
                                    <MdOutlineManageAccounts />
                                </i>
                                <span className={styles.navLogoName}>Quản lý sản phẩm</span>
                            </a>
                        </Link>
                        <div className={styles.list}>
                            <Link href="#!">
                                <a className={styles.navLink} onClick={() => router.push("/products")}>
                                    <FaHome />
                                    <span className={styles.navLinkName}>Bán sản phẩm</span>
                                </a>
                            </Link>
                            <Link href="#!">
                                <a className={styles.navLink} onClick={() => router.push("/chart-product")}>
                                    <FaChartBar />
                                    <span className={styles.navLinkName}>Doanh số bán hàng</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <Link href="#!">
                        <a className={styles.navLink}>
                            <i className={styles.navLinkIcon}>
                                <RiLogoutBoxRLine />
                            </i>
                            <span className={styles.navLinkOut}>Đăng xuất</span>
                        </a>
                    </Link>
                </nav>
            </aside>
            <h1>Content</h1>
            <button onClick={() => router.push("/add-product")}>Thêm sản phẩm</button>
        </div>
    );
};

export default Sidebar;