import ProductForm from "./ProductForm";

const CreateProduct = () => {
    const handleCreate = async (data) => {
        await api.createProduct(data);
    };

    return (
        <ProductForm mode="create" onSubmit={handleCreate} />
    );
};
