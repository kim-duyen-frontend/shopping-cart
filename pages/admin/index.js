import React from 'react';
import {useRouter} from "next/router"
import AdminLayout from "../../components/admin-layout";

const Admin = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Page Admin</h1>
            <button onClick={() => router.push("/add-product")}>Thêm sản phẩm</button>
        </div>
    );
};
Admin.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>
}
export default Admin;