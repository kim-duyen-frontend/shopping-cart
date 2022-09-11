import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react';
import styles from "../../styles/navbar.module.scss";

const Navbar = ({ quantity }) => {
    const router = useRouter();
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Image src="/logo/logo.png" width={60} height={40} objectFit="contain" />
                </div>
                <input className={styles.inputSearch} placeholder="Tìm sản phẩm" />
                <div className={styles.info}>
                    <IconButton size="large" aria-label="show product" color="inherit" onClick={() => router.push("/cart")}>
                        <Badge badgeContent={quantity} color="error">
                            <ShoppingCartOutlinedIcon color="white" fontSize="large" />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;