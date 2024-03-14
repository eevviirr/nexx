import Product from "../models/productModel.js";

class ProductControllers {
    async getProducts(req, res) {
        try {
            const {brands, search} = req.query
            const products = await Product.find(brands ? {brand:brands.toLowerCase().split(',')} : search ? {$or:[ { brand: { $regex: search, $options: 'i' } }, { model: { $regex: search, $options: 'i' } } ] } : {});
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении товара" });
        }
    }

    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res
                    .status(404)
                    .json({ message: "Данный товар не найден" });
            }

            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении товара" });
        }
    }

    async getProductFilter(req, res) {
        try {
            const { brand, sizes } = req.body;
            if (!req.body) {
                return res.json('Параметры обязательны')
            }
            const filter = {}
            if (brand) {
                filter.brand = brand
            }
            if (sizes) {
                sizes.forEach(element => {
                    filter.sizes = element
                });
            }
            const product = await Product.find(filter);
            if (product.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Данный товар не найден" });
            }

            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при получении товара" });
        }
    }
    async addProduct(req, res) {
        try {
            const {
                model,
                price,
                description,
                compound,
                brand,
                photos,
                sizes,
                colors,
            } = req.body;

            const newProduct = await Product.create({
                model,
                price,
                description,
                compound,
                brand,
                photos,
                sizes,
                colors,
            });
            newProduct.save();
            res.status(201).json({ message: "Товар успешно создан" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при добавлении товара" });
        }
    }

    async addComment(req, res) {
        try {
            const { id } = req.params;
            const { comment } = req.body;
            if (!comment) {
                return res.status(404).json({ message: "Отзыв должен быть" });
            }
            const newComment = await Product.findByIdAndUpdate(
                id,
                { $push: { comment } },
                {
                    new: true,
                }
            );
            console.log(newComment);
            res.status(200).json({ message: "Отзыв оставлен" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при добавлении отзыва" });
        }
    }

    async searchProduct(req, res) {
        try {
            const { searchValue } = req.body;
            const searchProduct = await Product.find({$text: {$search: searchValue}})
            res.json(searchProduct)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка при поиске товара" });
        }
    }
}

export default new ProductControllers();
