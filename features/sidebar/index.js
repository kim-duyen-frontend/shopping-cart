import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { FaBars, FaHome, FaChartBar } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import styles from "../../styles/sidebar.module.scss";
import { getProductsPage, myAPI } from "../../utils/api/callAPI";
import { Stack, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import ItemProductAdmin from '../../components/item-product-admin';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const [productList, setProductList] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const router = useRouter();
    const [page, setPage] = useState(1);

    const fetchProducts = async () => {
        const response = await myAPI.get(`/products?page=${page}`).then((json) => {
            setProductList(json.data.data);
        });
        return response?.data;
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        getProductsPage(page).then((json) => {
            setTotalPages(json);
            setProductList(json.data)
        })
    }, [page])

    const pagesArray = Array(totalPages.total).fill().map((_, index) => index + 1);
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
                                <span className={styles.navLogoName}>Qu???n l?? s???n ph???m</span>
                            </a>
                        </Link>
                        <div className={styles.list}>
                            <Link href="#!">
                                <a className={styles.navLink} onClick={() => router.push("/products")}>
                                    <FaHome />
                                    <span className={styles.navLinkName}>B??n s???n ph???m</span>
                                </a>
                            </Link>
                            <Link href="#!">
                                <a className={styles.navLink} onClick={() => router.push("/chart-product")}>
                                    <FaChartBar />
                                    <span className={styles.navLinkName}>Doanh s??? b??n h??ng</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <Link href="#!">
                        <a className={styles.navLink}>
                            <i className={styles.navLinkIcon}>
                                <RiLogoutBoxRLine />
                            </i>
                            <span className={styles.navLinkOut}>????ng xu???t</span>
                        </a>
                    </Link>
                </nav>
            </aside>
            <div className={styles.contentAdmin}>
                <div className={styles.actions}>
                    <Button variant="contained" onClick={() => router.push("/add-product")}>
                        <FaPlus />
                        <span>Th??m s???n ph???m</span>
                    </Button>
                </div>
                {productList.length > 0 && (
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>T??n s???n ph???m</Th>
                                <Th>Th????ng Hi???u</Th>
                                <Th>Xu???t x???</Th>
                                <Th>S??? l?????ng kho</Th>
                                <Th>Gi?? ti???n</Th>
                                <Th>H??nh ?????ng</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <>
                                {productList.map((item) => (
                                    <ItemProductAdmin key={item._id} product={item} fetchProducts={fetchProducts} />
                                ))}
                            </>
                        </Tbody>
                    </Table>
                )}
                <div className={styles.btnNumberPages}>
                    <Stack spacing={2}>
                        <Pagination color="primary" variant="outlined" shape="rounded" count={totalPages.last_page} page={parseInt(pagesArray.join())} onChange={(event, value) => setPage(value)} />
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;