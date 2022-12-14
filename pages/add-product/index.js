import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
    const router = useRouter();

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
            const response = await myAPI.post("/products", infoProduct).then((json) => console.log("push data successfully: ", json.data));
            if (infoProduct.title !== "" && infoProduct.brand !== "" && infoProduct.origin !== "" && infoProduct.brandOrigin !== "" && infoProduct.category !== "" && infoProduct.store !== "" && infoProduct.price !== "" && infoProduct.description !== "") {
                setInfoProduct((prevState) => ({
                    ...prevState,
                    title: "",
                    brand: "",
                    origin: "",
                    brandOrigin: "",
                    category: "",
                    store: "",
                    price: "",
                    description: ""
                }))
            }
            router.push("/products");
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
                    <h2>Nh???p c??c th??ng tin</h2>
                </div>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <div className={styles.form}>
                            <label>T??n s???n ph???m:</label>
                            <input
                                className={styles.input}
                                placeholder='nh???p t??n s???n ph???m'
                                type="text"
                                onChange={(e) => handleChangeField(e, "title")}
                            />
                            <label>Th????ng hi???u:</label>
                            <input
                                className={styles.input}
                                placeholder='nh???p th????ng hi???u'
                                type="text"
                                onChange={(e) => handleChangeField(e, "brand")}
                            />
                            <label>Xu???t x???</label>
                            <input
                                className={styles.input}
                                placeholder='nh???p xu???t x???'
                                type="text"
                                onChange={(e) => handleChangeField(e, "origin")}
                            />
                            <label>Xu???t x??? th????ng hi???u</label>
                            <input
                                className={styles.input}
                                placeholder='nh???p xu???t x??? th????ng hi???u'
                                type="text"
                                onChange={(e) => handleChangeField(e, "brandOrigin")}
                            />
                            <label>Lo???i s???n ph???m</label>
                            <select className={styles.input} onChange={(e) => handleChangeField(e, "category")}>
                                <option value="Ch???n lo???i:">Ch???n lo???i:</option>
                                <option value="Balo n???">Balo n???</option>
                                <option value="Balo nam">Balo nam</option>
                                <option value="Balo In H??nh">Balo In H??nh</option>
                                <option value="T??i x??ch & Balo">T??i x??ch & Balo</option>
                            </select>
                            <label>Kho h??ng:</label>
                            <input
                                className={styles.input}
                                placeholder="T???ng s??? l?????ng s???n ph???m"
                                type="number"
                                onChange={(e) => handleChangeField(e, "store")}
                            />
                            <label>Gi?? s???n ph???m:</label>
                            <input
                                className={styles.input}
                                placeholder='nh???p gi?? s???n ph???m'
                                type="number"
                                onChange={(e) => handleChangeField(e, "price")}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.editorText}>
                            <textarea rows={30} cols={100} placeholder="Nh???p m?? t???..." onChange={(e) => handleChangeField(e, "description")}></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.btnAdd}>
                    <button onClick={handCreateContent}>t???o n???i dung s???n ph???m</button>
                </div>
                <hr />
                <div className={styles.picture}>
                    <fieldset>
                        <legend>T???i h??nh s???n ph???m</legend>
                        <input
                            type="file"
                            onChange={handleChangeImage}
                        />
                        <div className={styles.imageUpload}>
                            {imageFile && <Image priority src={previewImage} width={100} height={100} objectFit='contain' alt="main image" />}
                        </div>
                        <div className={styles.btnAdd}>
                            <button onClick={handleCreateImage}>t???o h??nh ???nh s???n ph???m</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;


