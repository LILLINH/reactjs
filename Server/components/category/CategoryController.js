
const categoryService = require('./CategoryService');
const getCategories = async ()=>{
    try {
        return await categoryService.getCategories();
    } catch (error) {
        console.log(error)
    }
}


module.exports ={getCategories};