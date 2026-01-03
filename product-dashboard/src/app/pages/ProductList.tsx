// src/app/pages/ProductList.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts, selectFilteredProducts, setCategory, setSearch, setSort } from "../../features/products/productsSlice";
import ProductCard from "../../components/ProductCard";
import "./ProductList.css";
import ProductListHeader from "../../components/ProductListHeader";
import { FaSpinner } from 'react-icons/fa';
import { unwrapResult } from '@reduxjs/toolkit';

const ProductList = () => {
    const dispatch = useAppDispatch();
    const products: any = useAppSelector(selectFilteredProducts);
    const { status } = useAppSelector((state: any) => state.products);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const resultAction = await dispatch(fetchProducts());
                unwrapResult(resultAction);
            } catch (err) {
                console.error('Failed to load products:', err);
            }
        };
        
        loadProducts();
    }, [dispatch]);

    if (status === "loading") {
        return (
            <div className="products-loading flex flex-col items-center justify-center min-h-[200px]">
                <FaSpinner className="animate-spin h-20 w-20 text-blue-500 mb-2" />
                <p className="text-gray-600">Loading products...</p>
            </div>
        );
    }

    if (status === "error") {
        return <div className="products-error">Failed to load products</div>;
    }

    return (
        <div className="products-container">
           
            <ProductListHeader
                setSearch={(value: string) => dispatch(setSearch(value))}
                setCategory={(value: string) => dispatch(setCategory(value))}
                setSort={(value: "asc" | "desc") => dispatch(setSort(value))}
            />
            {products.length === 0 ? (
                <div className="products-empty">
                    <p className="text-gray-500 text-lg">No products found. Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="products-grid mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: any) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;