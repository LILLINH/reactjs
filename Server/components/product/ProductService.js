
const productModel = require('./ProductModel');
//Lay toan bo san pham trong database
const getAllProducts = async () => {
  try {
    //return data;
    return await productModel.find();

  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

//Lay toan bo san pham trong database
const getAllProducts_v2 = async (page,size) => {
  let skip=(page -1)*size;
  let limit =size;
  try {
    //return data;
    return await productModel
    .find({},'name price category')//chi lay name va pprice
    .populate('category','name')//lay thong tin category
    .sort({name : 1})//sap xep theo ten tang dan
    .skip(0)//bo qua 2 san pham
    .limit(10)



  } catch (error) {
    console.log('error', error);
    throw error;
  }
}


//xoa san pham theo id
const deleteProductbyID = async (id) => {
  try {
    // const index = data.findIndex(item => item._id.toString() == id.toString());
    // if (index >= 0) {
    //   data.splice(index, 1);
    //   return true;
    // }
    await productModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('Delete product by Id error: ', error);
    return false;
  }

}

// them moi san pham vao data base
const addNewProduct = async (name, price, quantity, image, category) => {
  try {
    // const newProduct = {

    //   _id: data.length + 1,
    //   name,
    //   price,
    //   quantity,
    //   image,
    //   category,
    // }
    // data.push(newProduct);
    const newProduct = {
      name, price, quantity, image, category
    }
    const p = new productModel(newProduct);
    await p.save();
    return true;

  } catch (error) {
    console.log('Add new product error: ', error);
    return false;
  }
}
// lay thong tin 1 san pham theo id
const getProductByID = async (id) => {
  try {
    // const product = data.find(item => item._id.toString() == id.toString());
    // if (product) {
    //   return product;

    // }
    // return null;
    return await productModel.findById(id);

  } catch (error) {
    console.log('Get product by id error: ', error);
    return null;
  }
}
// cap nhat san pham theo id
const updateProductById = async (id, name, price, quantity, image, category) => {
  try {
    // const product = data.find(item => item._id.toString() == id.toString());
    // if (product) {
    //   data = data.map(item => {
    //     if (item._id.toString() == id.toString()) {
    //       item.name = name ? name : item.name;
    //       item.price = price ? price : item.price;
    //       item.quantity = quantity ? quantity : item.quantity;
    //       item.image = image ? image : item.image;
    //       item.category = category ? category : item.category;
    //     }
    //     return item;
    //   });
    //   return true;
    // }
    // return false;
    const product = await productModel.findById(id);
    if (product) {
      product.name = name ? name : product.name;
      product.price = price ? price : product.price;
      product.quantity = quantity ? quantity : product.quantity;
      product.image = image ? image : product.image;
      product.category = category ? category : product.category;
      await product.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log('Update product by id error: ', error);
    return false;
  }
}
// tim kiem san pham theo ten
const searchProductByName = async (name) => {
  try {
    return await productModel.find({ 
      //ten khong biet hoa thuong
      name: { $regex: name, $options: 'i' },
      // gia tien nam trong khoang tu 10-100
      price:{$gte:10,$lte:100}//greater than or equal 10, less then or equal 100
     });
    
    
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getAllProducts,getAllProducts_v2, deleteProductbyID, addNewProduct, getProductByID, updateProductById, searchProductByName };

var data =
  [{
    "_id": 1,
    "name": "Eurasian badger",
    "price": 37,
    "quantity": 85,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 2
  }, {
    "_id": 2,
    "name": "Agile wallaby",
    "price": 37,
    "quantity": 6,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 6
  }, {
    "_id": 3,
    "name": "Bulbul, african red-eyed",
    "price": 56,
    "quantity": 73,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 3
  }, {
    "_id": 4,
    "name": "Porcupine, indian",
    "price": 9,
    "quantity": 22,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 1
  }, {
    "_id": 5,
    "name": "Magistrate black colobus",
    "price": 56,
    "quantity": 49,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 4
  }, {
    "_id": 6,
    "name": "Pine siskin",
    "price": 73,
    "quantity": 86,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 7
  }, {
    "_id": 7,
    "name": "Creeper, black-tailed tree",
    "price": 44,
    "quantity": 68,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 9
  }, {
    "_id": 8,
    "name": "Oryx, beisa",
    "price": 1,
    "quantity": 84,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 2
  }, {
    "_id": 9,
    "name": "Long-crested hawk eagle",
    "price": 7,
    "quantity": 88,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 3
  }, {
    "_id": 10,
    "name": "Yak",
    "price": 61,
    "quantity": 4,
    "image": "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/23/1170968/Blackpink.jpeg",
    "category": 5
  }]
