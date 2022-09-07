import React, { useState } from 'react';
import { myAPI } from "../../utils/api/callAPI";
import styles from "../../styles/addproduct.module.scss";
import Image from 'next/image';

const AddProduct = () => {
    const [infoProduct, setInfoProduct] = useState({
        title: "",
        brand: "",
        origin: "",
        brandOrigin: "",
        category: "",
        store: "",
        price: "",
        description: ""
    })
    const [imageFile, setImageFile] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleChangeField = (e, type) => {
        infoProduct[type] = e.target.value;
        setInfoProduct({ ...infoProduct })
    }
    const handleChangeImage = (e) => {
        const selectedFile = e.target.files[0];
        setImageFile(selectedFile);
        const filePreview = URL.createObjectURL(selectedFile);
        setPreviewImage(filePreview)
    }

    const handCreateContent = async () => {
        try {
            const response = await myAPI.post("/products", infoProduct).then((json) => console.log("push data successfully: ", json.data))
            return response?.data;
        } catch (error) {
            console.log("Failed push data!!!", error);
        }
    }
    const handleCreateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', imageFile)
        myAPI.post("/photos/upload", formData, {
            headers: {
                "enc-type": "multipart/form-data"
            }
        }).then((json) => console.log("check image: ", json)).catch((error) => console.log(error))
    }

    return (
        <div className={styles.addProduct}>
            <div className="container">
                <div className={styles.title}>
                    <h2>Nhập các thông tin</h2>
                </div>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <div className={styles.form}>
                            <label>Tên sản phẩm:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập tên sản phẩm'
                                type="text"
                                onChange={(e) => handleChangeField(e, "title")}
                            />
                            <label>Thương hiệu:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập thương hiệu'
                                type="text"
                                onChange={(e) => handleChangeField(e, "brand")}
                            />
                            <label>Xuất xứ</label>
                            <input
                                className={styles.input}
                                placeholder='nhập xuất xứ'
                                type="text"
                                onChange={(e) => handleChangeField(e, "origin")}
                            />
                            <label>Xuất xứ thương hiệu</label>
                            <input
                                className={styles.input}
                                placeholder='nhập xuất xứ thương hiệu'
                                type="text"
                                onChange={(e) => handleChangeField(e, "brandOrigin")}
                            />
                            <label>Loại sản phẩm</label>
                            <select className={styles.input} onChange={(e) => handleChangeField(e, "category")}>
                                <option value="Chọn loại:">Chọn loại:</option>
                                <option value="Balo nữ">Balo nữ</option>
                                <option value="Balo nam">Balo nam</option>
                                <option value="Balo In Hình">Balo In Hình</option>
                                <option value="Túi xách & Balo">Túi xách & Balo</option>
                            </select>
                            <label>Kho hàng:</label>
                            <input
                                className={styles.input}
                                placeholder="Tổng số lượng sản phẩm"
                                type="number"
                                onChange={(e) => handleChangeField(e, "store")}
                            />
                            <label>Giá sản phẩm:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập giá sản phẩm'
                                type="number"
                                onChange={(e) => handleChangeField(e, "price")}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.editorText}>
                            <textarea rows={30} cols={100} placeholder="Nhập mô tả..." onChange={(e) => handleChangeField(e, "description")}></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.btnAdd}>
                    <button onClick={handCreateContent}>tạo nội dung sản phẩm</button>
                </div>
                <hr />
                <div className={styles.picture}>
                    <fieldset>
                        <legend>Tải hình sản phẩm</legend>
                        <input
                            type="file"
                            onChange={handleChangeImage}
                        />
                        <div className={styles.imageUpload}>
                            {imageFile && <Image priority src={previewImage} width={100} height={100} objectFit='contain' alt="main image" />}
                        </div>
                        <div className={styles.btnAdd}>
                            <button onClick={handleCreateImage}>tạo hình ảnh sản phẩm</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;


