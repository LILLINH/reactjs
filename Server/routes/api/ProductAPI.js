const express = require('express');
const router = express.Router();

const productController = require('../../components/product/ProductController');
const { checkTokenApp } = require('../../middle/Authen');
const UploadFile = require('../../middle/UploadFile');

// http://localhost:3000/api/product
// http://localhost:3000/api/product/get-all
//api get all product

router.get('/get-all', 
//[checkTokenApp],
 async (req, res, next) => {
    try {
        const products = await productController.getAllProducts();
        return res.status(200).json({ result: true, products: products });

    } catch (error) {
        return res.status(500).json({ result: false, products: null })
    }
});
// http://localhost:3000/api/product/get-by-id?id=
// api get product by id
router.get('/get-by-id', [checkTokenApp], async (req, res, next) => {
    try {
        const { id } = req.query;
        const product = await productController.getProductByID(id);
        return res.status(200).json({ result: true, product: product });

    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});
// http://localhost:3000/api/product/search-by-name?name=
// api search by name
router.get('/search-by-name', [checkTokenApp], async (req, res, next) => {
    try {
        const { name } = req.query;
        const products = await productController.searchProductByName(name);
        return res.status(200).json({ result: true, products: products });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, products: null });

    }
})
// http://localhost:3000/api/product/new
// api them san pham
router.post('/new', [checkTokenApp, UploadFile.single('image')], async (req, res, next) => {
    try {
        let { file, body } = req;
        if (file) {
            file = 'http://localhost:3000/uploads/images/${file.filename}';
            body = { ...body, image: file };
        }
        const { name, price, quantity, image, category } = body;
        await productController.addNewProduct(name, price, quantity, image, category);
        return res.status(200).json({ result: true, product: null });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ result: false, product: null });

    }
});



// api upload anh san pham
// http://localhost:3000/api/product/upload-image
router.post('/upload-image', [ UploadFile.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (file) {
            const link = 'http://localhost:3000/uploads/images/${file.filename}';
            return res.status(200).json({ result: true, link: link });
        }
        return res.status(400).json({ result: false, link: null });
    } catch (error) {
        console.log('upload error', error);
        return res.status(500).json({ result: false });
    }
});
// upload nhieu hinh
// http://localhost:3000/api/product/upload-images
router.post('/upload-images', [UploadFile.array('image',2)], async (req, res, next) => {
    try {
        const { files } = req;
        if (files && files.length >0) {
            const links = [];
            for (let index = 0;index <files.length;index ++){
                const element = files[index];
                links.push('http://localhost:3000/uploads/images/${element.filename}');
            }
            return res.status(200).json({ result: true, links: links });
        }
        return res.status(400).json({ result: false, links: null });
    } catch (error) {
        console.log('upload error', error);
        return res.status(500).json({ result: false });
    }
});




module.exports = router;
