
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductForm from "../productForm/ProductForm.jsx";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.getProduct(id).then(setProduct);
    }, [id]);

    const handleUpdate = async (updatedData) => {
        await api.updateProduct(id, updatedData);
    };

    return (
        product && (
            <ProductForm
                mode="edit"
                initialValues={product}
                onSubmit={handleUpdate}
            />
        )
    );
};
