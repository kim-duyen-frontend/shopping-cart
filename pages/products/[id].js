import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../features/navbar';
import styles from "../../styles/detailproduct.module.scss";
import { myAPI } from "../../utils/api/callAPI";
import formatNumberToVND from "../../utils/currency";
import { addToCart } from "../cart/cartSlice";
import { v4 as uuidv4 } from 'uuid';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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

    const dataSlideShow = [
        {
            id: uuidv4(),
            name: "Balo Laptop 13.3 14 15.4 15.6 Inch Du Lịch Túi Đựng Macbook Air Pro Chống Nước Di Động Máy Tính túi",
            thumbnail: "/slideshow/1ef441e3e3753e2e1a3e42bfe1947e7e.jpg",
            price: 591192,
        },
        {
            id: uuidv4(),
            name: "MARK RYDEN Men Backpack Multi-layer Computer Pocket Anti-theft Brush Pocket USB Dual Ports Waterproof Travel Bag",
            thumbnail: "/slideshow/667bde33fb6aa2b219c5c9df9c1e0f91.jpg",
            price: 932000,
        },
        {
            id: uuidv4(),
            name: "Balo Thể Thao Siêu Nhẹ Đa Năng Dung Tích 12L",
            thumbnail: "/slideshow/083f1810a7bc44b7e55a929ea1be243c.jpg",
            price: 381944,
        },
        {
            id: uuidv4(),
            name: "Túi vải Oxford đeo vai nữ chống nước dung tích lớn",
            thumbnail: "/slideshow/a3e57f080267f5c6eb821c723ec7feba.jpg",
            price: 334100,
        },
        {
            id: uuidv4(),
            name: "Túi Đựng Máy Ảnh Đa Năng Chống Thấm Nước Sức Chứa Lớn Tiện Dụng Mang Theo Du Lịch",
            thumbnail: "/slideshow/abeb6a6445d610b1da81193f83ffe0f8.jpg",
            price: 882364,
        },
        {
            id: uuidv4(),
            name: "Túi đeo chéo ngực của nam giới, sức chứa lớn, thiết kế có cổng USB bên ngoài, chất liệu vải chống thấm nước",
            thumbnail: "/slideshow/dec7e225db22939c8e5d3d5b84c25781.jpg",
            price: 323000,
        },
        {
            id: uuidv4(),
            name: "Ba Lô Máy Tính Công Sở Thời Trang Túi Ngoài Trời Giải Trí Du Lịch Bộ Bên Ngoài Cổng USB Màu Xanh Đen",
            thumbnail: "/slideshow/889d8aefb6101333dedbcf08b02824df.jpg",
            price: 714357,
        },
        {
            id: uuidv4(),
            name: "Túi lưu trữ hàng tạp hóa cách nhiệt 15L không thấm nước dùng cho cắm trại dã ngoại",
            thumbnail: "/slideshow/bdef121627167de7d738c09e37893f57.jpg",
            price: 214000,
        },
        {
            id: uuidv4(),
            name: "Balo nữ sinh đi học đi chơi đi làm không thấm nước cao cấp phong cách mới",
            thumbnail: "/slideshow/447831c2d77a78a7c545f8a8d2eeef21.jpg",
            price: 430000,
        },
        {
            id: uuidv4(),
            name: "Túi Laptop Unisex Ba Lô Máy Tính USB Sạc",
            thumbnail: "/slideshow/42542c6d049d3a966c95b264330942a4.jpg",
            price: 653499,
        },
    ]
    const [slideIndex, setSlideIndex] = useState(0);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const getProductById = async () => {
        const response = await myAPI.get(`/products/${id}`).then((json) => setDataProduct(json.data));
        return response?.data;
    }


    useEffect(() => {
        getProductById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeQty = (event) => {
        const newValue = parseInt(event.target.value);
        setQuantity(newValue);
    }

    const handleChangeClickImage = (e, index) => {
        e.preventDefault();
        setSlideIndex(index);
    }

    const handleAddToCart = (event, quantity) => {
        event.preventDefault();
        dispatch(addToCart({
            id: dataProduct._id,
            product: dataProduct,
            quantity
        }))
    }
    const backwardSlideShow = (event) => {
        event.preventDefault();
        ref.current.scrollLeft -= ref.current.offsetWidth;
    }
    const forwardSlideShow = (event) => {
        event.preventDefault();
        ref.current.scrollLeft += ref.current.offsetWidth;
    }

    return (
        <div className={styles.detailProduct}>
            <Navbar quantity={quantity} />
            <div className="container">
                <div className={styles.container}>
                    <div className={styles.leftCol}>
                        {dataSlideGallery.map((slide, index) => (
                            <div className={`${styles.image} ${index === slideIndex ? styles.active : ""}`} key={index}>
                                <Image priority src={slide.thumbnail} layout="fill" objectFit="cover" alt="main image slide" />
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
                                        alt="images slide"
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
                        <div className={styles.btnBuy} onClick={(event) => handleAddToCart(event, quantity)}>Chọn mua</div>
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
                <div className={styles.slideshow}>
                    <div className={styles.slide} ref={ref}>
                        {dataSlideShow.map((item) => (
                            <div className={styles.item} key={item.id}>
                                <div className={styles.image}>
                                    <Image priority src={item.thumbnail} layout="fill" objectFit="contain" alt={item.name} />
                                </div>
                                <div className={styles.infoSlide}>
                                    <span className={styles.name}>{item.name}</span>
                                    <span className={styles.price}>{formatNumberToVND(item.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className={styles.prev} onClick={backwardSlideShow}>
                        <FaAngleLeft />
                    </span>
                    <span className={styles.next} onClick={forwardSlideShow}>
                        <FaAngleRight />
                    </span>
                </div>
            </div>
        </div>
    );
};
DetailProduct.getInitialProps = ({ query: { id } }) => {
    return { id }
}
export default DetailProduct;