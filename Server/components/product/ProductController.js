
const productService = require('./ProductService');
const getAllProducts = async () => {
    try {
        return await productService.getAllProducts();
    } catch (error) {
        throw error;
    }

}
const deleteProductbyID = async (id) => {
    try {
        return await productService.deleteProductbyID(id);
    } catch (error) {
        return false;
    }

}
const addNewProduct = async (name, price, quantity, image, category) => {
    try {
        return await productService.addNewProduct(name, price, quantity, image, category);

    } catch (error) {
        return false;
    }
}
const getProductByID = async (id) => {
    try {
        return await productService.getProductByID(id);
    } catch (error) {
        return null;
    }
}
const updateProductById = async (id, name, price, quantity, image, category) => {
    try {
        return await productService.updateProductById(id, name, price, quantity, image, category);
    } catch (error) {
        return false;
    }
}
const searchProductByName = async (name)=>{
    try {
        return await productService.searchProductByName(name);

    } catch (error) {
        console.log(error)
    }
    return null;
}
module.exports = { getAllProducts, deleteProductbyID, addNewProduct, updateProductById, getProductByID, searchProductByName };
