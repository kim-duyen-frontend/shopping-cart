import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { FaBars, FaHome, FaChartBar } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import styles from "../../styles/sidebar.module.scss";
import { myAPI } from "../../utils/api/callAPI";
import ItemProduct from '../../components/item-product';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const [productList, setProductList] = useState([]);
    const router = useRouter();

    const fetchProducts = async () => {
        const response = await myAPI.get("/products").then((json) => {
            setProductList(json.data)
        });
        return response?.data;
    }
    useEffect(() => {
        fetchProducts();
    }, [])
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
            <div className={styles.contentAdmin}>
                <div className={styles.actions}>
                    <button onClick={() => router.push("/add-product")}>Thêm sản phẩm</button>
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Tên sản phẩm</Th>
                            <Th>Thương Hiệu</Th>
                            <Th>Xuất xứ</Th>
                            <Th>Số lượng kho</Th>
                            <Th>Giá tiền</Th>
                            <Th>Hành động</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {productList.map((item) => (
                            <ItemProduct key={item._id} product={item} />
                        ))}
                    </Tbody>
                </Table>
            </div>
        </div>
    );
};

export default Sidebar;