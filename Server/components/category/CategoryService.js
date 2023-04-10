const categoryModel = require('./CategoryModel')


const getCategories = async()=>{
    try {
        //return data;
        return await categoryModel.find(); // select * from categories
    } catch (error) {
        console.log(error);
    }
};

module.exports = {getCategories};

var data =[{
    "_id": 1,
    "name": "White-necked stork"
  }, {
    "_id": 2,
    "name": "Brush-tailed bettong"
  }, {
    "_id": 3,
    "name": "Black-backed magpie"
  }, {
    "_id": 4,
    "name": "Marabou stork"
  }, {
    "_id": 5,
    "name": "African bush squirrel"
  }, {
    "_id": 6,
    "name": "Deer, spotted"
  }, {
    "_id": 7,
    "name": "Rock dove"
  }, {
    "_id": 8,
    "name": "Burchell's gonolek"
  }, {
    "_id": 9,
    "name": "Skink, african"
  }, {
    "_id": 10,
    "name": "Kangaroo, red"
  }]