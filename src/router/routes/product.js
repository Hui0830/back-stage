import React from 'react';

import Product from 'pages/product/edit_product';

const EditProduct = () => <Product isEdit={true} />

export default [
    {
        path: '/product',
        loader: () => import('pages/product/product_stock'),
        exact: true
    },
    {
        path: '/product/add',
        loader: Product,
        async: true,
        exact: true,
    },
    {
        path: '/product/drafts',
        loader: () => import('pages/product/product_stock'),
        exact: true
    },
    {
        path: '/product/edit/:id',
        loader: EditProduct,
        exact: true,
        async: true
    }
]