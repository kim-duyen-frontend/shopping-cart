import { Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Navbar from '../../features/navbar';
import styles from "../../styles/detailproduct.module.scss";
import { myAPI } from "../../utils/api/callAPI";
import formatNumberToVND from "../../utils/currency";

const DetailProduct = ({ id }) => {
    const [dataProduct, setDataProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const dataSlideGallery = [
        {
            thumbnail: "/products/balo-1.png"
        },
        {
            thumbnail: "/products/balo-2.png"
        },
        {
            thumbnail: "/products/balo-3.png"
        },
        {
            thumbnail: "/products/balo-4.png"
        }
    ];
    const [slideIndex, setSlideIndex] = useState(0);

    const getProductById = async () => {
        const response = await myAPI.get(`/products/${id}`).then((json) => setDataProduct(json.data));
        return response?.data;
    }

    useEffect(() => {
        getProductById();
    }, [])

    const handleChangeQty = (event) => {
        const newValue = parseInt(event.target.value);
        setQuantity(newValue);
    }

    const handleChangeClickImage = (e, index) => {
        e.preventDefault();
        setSlideIndex(index);
    }

    return (
        <div className={styles.detailProduct}>
            <Navbar />
            <div className="container">
                <div className={styles.container}>
                    <div className={styles.leftCol}>
                        {dataSlideGallery.map((slide, index) => (
                            <div className={`${styles.image} ${index === slideIndex ? styles.active : ""}`} key={index}>
                                <Image priority src={slide.thumbnail} layout="fill" objectFit="cover" />
                            </div>
                        ))}

                        <div className={styles.galleryImage}>
                            {dataSlideGallery.map((item, index) => (
                                <div className={`${index === slideIndex ? styles.active : ""}`} key={index}>
                                    <Image
                                        src={item.thumbnail}
                                        width={70}
                                        height={50}
                                        layout="responsive"
                                        objectFit="cover"
                                        onClick={(e) => handleChangeClickImage(e, index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.rightCol}>
                        <h6 className={styles.brand}>
                            Thương hiệu &nbsp;
                            <Link href="#!">
                                <a className={styles.linkBrand}>{dataProduct.brand}</a>
                            </Link>
                        </h6>
                        <h1 className={styles.title}>{dataProduct.title}</h1>
                        <div className={styles.price}>{formatNumberToVND(dataProduct.price)}</div>
                        <hr />
                        <p className={styles.quantity}>Số lượng</p>
                        <div className={styles.groupInput}>
                            <button className={styles.minus} onClick={() => quantity > 0 ? setQuantity((prevQty) => prevQty - 1) : null}>-</button>
                            <input className={styles.inputNumber} value={quantity} onChange={handleChangeQty} />
                            <button className={styles.plus} onClick={() => setQuantity((prevQty) => prevQty + 1)}>+</button>
                        </div>
                        <div className={styles.btnBuy}>Chọn mua</div>
                    </div>
                </div>
                <div className={styles.infoDetail}>
                    <h3 className={styles.titleInfo}>thông tin chi tiết</h3>
                    <div className={styles.gridInfoDetail}>
                        <div className={styles.left}>
                            <div className={styles.text}>Xuất xứ</div>
                            <div className={styles.text}>Xuất xứ thương hiệu</div>
                            <div className={styles.text}>Thương hiệu</div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.textInfo}>{dataProduct.origin}</div>
                            <div className={styles.textInfo}>{dataProduct.brandOrigin}</div>
                            <div className={styles.textInfo}>{dataProduct.brand}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.infoDetail}>
                    <h3 className={styles.titleInfo}>mô tả sản phẩm</h3>
                    <p className={styles.description}>{dataProduct.description}</p>
                </div>
            </div>
        </div>
    );
};
DetailProduct.getInitialProps = ({ query: { id } }) => {
    return { id }
}
export default DetailProduct;