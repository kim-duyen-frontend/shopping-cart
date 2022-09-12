import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cartTotalSelector } from "../cart/selectors";
import { removeFromCart } from "../cart/cartSlice";
import styles from "../../styles/cart.module.scss";
import formatNumberToVND from "../../utils/currency";
import { useState } from 'react';

const CartPage = () => {
    const productCart = useSelector((state) => state.cart.cartItems);
    const cartTotal = useSelector(cartTotalSelector);
    const dispatch = useDispatch();
    const router = useRouter();
    const [check, setIsCheck] = useState(false);

    const handleDeleteProduct = (cartItem) => {
        setIsCheck(true);
        dispatch(removeFromCart(cartItem));
    }
    
    return (
        <div className={styles.cartPage}>
            <div className="container">
                <div className={styles.container}>
                    <div>Giỏ hàng {productCart.length}</div>
                    {productCart.map((item) => (
                        <div className={styles.lineProduct} key={item.product._id}>
                            <Image priority src="/products/balo-1.png" width={100} height={100} />
                            <h4>{item.product.title}</h4>
                            <p>{item.quantity}</p>
                            <p>{formatNumberToVND(cartTotal)}</p>
                            <button className={styles.btnDelete} onClick={() => handleDeleteProduct(item)}>Xóa</button>
                        </div>
                    ))}
                    <div className={styles.btnbuy} onClick={() => router.push("/checkout")}>Tiến hành đặt hàng</div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;