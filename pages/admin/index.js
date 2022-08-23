import React from 'react';
import AdminLayout from "../../components/admin-layout";

const Admin = () => {
    return (
        <div>
            <h1>Page Admin</h1>
            {/* gọi các components */}
        </div>
    );
};
Admin.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>
}
export default Admin;