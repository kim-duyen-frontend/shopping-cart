import Image from 'next/image';
import React from 'react';
import { useSelector } from "react-redux";
import styles from "../../styles/cart.module.scss";

const CartPage = () => {
    const productCart = useSelector((state) => state.cart.cartItems);
    return (
        <div className={styles.cartPage}>
            <div className="container">
                <div className={styles.container}>
                    <div>Giỏ hàng(1)</div>
                    {productCart.map((item) => (
                        <div className={styles.lineProduct} key={item.product._id}>
                            <Image priority src="/products/balo-1.png" width={100} height={100} />
                            <h4>{item.product.title}</h4>
                            <p>{item.quantity}</p>
                            <p>{item.product.price}</p>
                        </div>
                    ))}
                    <div className={styles.btnbuy}>Tiến hành đặt hàng</div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;