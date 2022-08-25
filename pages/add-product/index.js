import React, { useState } from 'react';
import RichTextEditor from '../../components/rich-text-editor';
import styles from "../../styles/addproduct.module.scss";

const AddProduct = () => {
    const [infoProduct, setInfoProduct] = useState({
        title: "",
        brand: "",
        price: ""
    })
    const [files, setFiles] = useState([]);

    const handleChangeInfo = (e, type) => {
        infoProduct[type] = e.target.value;
        setInfoProduct({ ...infoProduct })
    }
    const handleChangeFile = (e) => {
        e.preventDefault();
        let id = e.target.id;
        let file_reader = new FileReader();
        let file = e.target.files[0];
        file_reader.onload = () => {
            setFiles([
                ...files,
                {
                    file_id: id,
                    uploaded_file: file_reader.result
                }
            ]);
        };
        file_reader.readAsDataURL(file);
    }
    const handleSubmit = () => {
        console.log("check data file: ", files);
        console.log("check data product: ", { ...infoProduct });
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
                                onChange={(e) => handleChangeInfo(e, "title")}
                            />
                            <label>Thương hiệu:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập thương hiệu'
                                onChange={(e) => handleChangeInfo(e, "brand")}
                            />
                            <label>Giá sản phẩm:</label>
                            <input
                                className={styles.input}
                                placeholder='nhập giá sản phẩm'
                                onChange={(e) => handleChangeInfo(e, "price")}
                            />
                            <label>Tải hình 1:</label>
                            <input
                                type="file"
                                id={1}
                                onChange={handleChangeFile}
                            />
                            <label>Tải hình 2:</label>
                            <input
                                type="file"
                                id={2}
                                onChange={handleChangeFile}
                            />
                            <label>Tải hình 3:</label>
                            <input
                                type="file"
                                id={3}
                                onChange={handleChangeFile}
                            />
                            <label>Tải hình 4:</label>
                            <input
                                type="file"
                                id={4}
                                onChange={handleChangeFile}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.editorText}>
                            <RichTextEditor />
                        </div>
                    </div>
                </div>
                <div className={styles.btnAdd}>
                    <button onClick={handleSubmit}>thêm sản phẩm</button>
                </div>
            </div>

        </div>
    );
};

export default AddProduct;