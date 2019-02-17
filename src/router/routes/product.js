import React from 'react';

import Product from '../../product/edit_product';
import ProductStock from '../../product/product_stock';

const EditProduct = () => <Product isEdit={true} />

export default [
    {
        path: '/product',
        component: ProductStock,
        exact: true
    },
    {
        path: '/product/add',
        component: Product,
        exact: true,
    },
    {
        path: '/product/drafts',
        component: ProductStock,
        exact: true
    },
    {
        path: '/product/edit/:id',
        component: EditProduct,
        exact: true
    }
]