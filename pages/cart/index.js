import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cartTotalSelector } from "../cart/selectors";
import { removeFromCart } from "../cart/cartSlice";
import styles from "../../styles/cart.module.scss";
import formatNumberToVND from "../../utils/currency";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

const NoSsr = (props) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])
    return <>
        {mounted ? props.children : null}
    </>
}
const CartPage = () => {
    const productCart = useSelector((state) => state.cart.cartItems);
    const cartTotal = useSelector(cartTotalSelector);
    const dispatch = useDispatch();
    const [check, setIsCheck] = useState(false);

    const handleDeleteProduct = (cartItem) => {
        setIsCheck(true);
        dispatch(removeFromCart(cartItem));
    }

    const handleSubmitCart = () => {
        toast.success("Đặt hàng thành công");
    }

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <div className={styles.container}>
                    <h4 className={styles.numberCart}>Giỏ hàng ({productCart.length})</h4>
                    <NoSsr>
                        {productCart.map((item) => (
                            <div className={styles.lineProduct} key={item.product._id}>
                                <Image priority src="/products/balo-1.png" width={150} height={150} objectFit="contain" alt={item.product.title} />
                                <p>{item.product.title}</p>
                                <p>{item.quantity}</p>
                                <p>{formatNumberToVND(item.product.price)}</p>
                                <button className={styles.btnDelete} onClick={() => handleDeleteProduct(item)}>Xóa</button>
                            </div>
                        ))}
                    </NoSsr>
                    <div className={styles.totalPrice}>
                        <h3>Tổng tiền: {formatNumberToVND(cartTotal)}</h3>
                        <div className={styles.btnbuy} onClick={handleSubmitCart}>Tiến hành đặt hàng</div>
                    </div>
                    <ToastContainer className="toast-position"
                        position="top-right"
                        autoClose={10000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;