var express = require('express');
var router = express.Router();
const productController = require('../../components/product/ProductController');
const categoryController = require('../../components/category/CategoryController');
const uploadFile = require('../../middle/UploadFile');
const { checkTokenCpanel} = require('../../middle/Authen')

//http://localhost:3000/cpanel/product/
//hien thi trang san pham
router.get('/',[checkTokenCpanel], async (req, res, next) => {
    const products = await productController.getAllProducts();
    res.render('product/list', { products });
});
//http://localhost:3000/cpanel/product/:id/delete
// xoa san phan theo id
// hien thi lai trang san pham
router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.deleteProductbyID(id);
        res.json({ result });
    } catch (error) {
        res.json({ result: false });
    }
})

//http://localhost:3000/cpanel/product/new
// hien thi form  them san pham
router.get('/new',[checkTokenCpanel], async (req, res, next) => {
    try {
        const categories = await categoryController.getCategories();
        return res.render('product/new', { categories });
    } catch (error) {
        next(error);
    }

});
//http://localhost:3000/cpanel/product/new
// xu li form  them san pham
router.post('/new', [checkTokenCpanel,uploadFile.single('image')], async (req, res, next) => {

    try {
        let { body, file } = req;
        if (file) {
            file = `http://172.16.97.79:3000/images/${file.filename}`;
            body = { ...body, image: file };
        } const { name, price, quantity, image, category } = body;
        console.log('body: ', body);
        const result = await productController.addNewProduct(name, price, quantity, image, category);
        console.log(result);

        if (result) {
            return res.redirect('/cpanel/product');
        } else {
            return res.redirect('/cpanel/product/new');
        }
    } catch (error) {
        next(error);
    }

});
//http://localhost:3000/cpanel/product/:id/edit
//hien thi trang thong tin chi tiet san pham
router.get('/:id/edit',[checkTokenCpanel], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productController.getProductByID(id);
        let categories = await categoryController.getCategories();
        categories = categories.map(item => {
            item.selected = false;
            if (item._id.toString() == product.category.toString()) {
                item.selected = true;

            }
            return item;
        });
        //console.log(product,categories);
        return res.render('product/edit', { product, categories });

    } catch (error) {
        next(error)
    }
});
//http://localhost:3000/cpanel/product/:id/edit
// xu li cap nhat san pham
router.post('/:id/edit', [checkTokenCpanel,uploadFile.single('image')], async (req, res, next) => {

    try {
        let { body, file } = req;
        let { id } = req.params;
        if (file) {
            file = `http://172.16.97.79:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { name, price, quantity, image, category } = body;
        console.log('body: ', body);
        const result = await productController.updateProductById(id, name, price, quantity, image, category);
        console.log(result);

        if (result) {
            return res.redirect('/cpanel/product');
        } else {
            return res.redirect('/cpanel/product/:id/edit');
        }
    } catch (error) {
        console.log('update eroor: ', error);
        next(error);
    }

});
module.exports = router;
