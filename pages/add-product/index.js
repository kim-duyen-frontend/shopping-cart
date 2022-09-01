import React, { useState } from 'react';
import { myAPI } from "../../utils/api/callAPI";
import EditorTextDraft from '../../components/editor-text-draft';
import styles from "../../styles/addproduct.module.scss";
import Image from 'next/image';

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [origin, setOrigin] = useState("");
    const [brandOrigin, setBrandOrigin] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleChangeImage = (e) => {
        const selectedFile = e.target.files[0];
        setImageFile(selectedFile);
        const filePreview = URL.createObjectURL(selectedFile);
        setPreviewImage(filePreview)
    }

    const handCreateContent = async () => {
        try {
            const response = await myAPI.post("/products", { title, brand, origin, brandOrigin, price }).then((json) => console.log("check data: ", json.data))
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
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label>Thương hiệu:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập thương hiệu'
                                type="text"
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <label>Xuất xứ</label>
                            <input
                                className={styles.input}
                                placeholder='nhập xuất xứ'
                                type="text"
                                onChange={(e) => setOrigin(e.target.origin)}
                            />
                            <label>Xuất xứ thương hiệu</label>
                            <input
                                className={styles.input}
                                placeholder='nhập xuất xứ thương hiệu'
                                type="text"
                                onChange={(e) => setBrandOrigin(e.target.value)}
                            />
                            <label>Giá sản phẩm:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập giá sản phẩm'
                                type="text"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <div className={styles.btnAdd}>
                                <button onClick={handCreateContent}>tạo nội dung sản phẩm</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.editorText}>
                            <EditorTextDraft />
                        </div>
                    </div>
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


