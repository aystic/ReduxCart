import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRODUCTS = [
	{
		id: "P1",
		name: "Milk",
		description: "Homogenised toned milk",
		price: 40,
	},
	{
		id: "P2",
		name: "Bread",
		description: "Fresh bread",
		price: 40,
	},
];
const Products = (props) => {
	const productList = DUMMY_PRODUCTS.map((product) => {
		return (
			<ProductItem
				id={product.id}
				key={product.id}
				title={product.name}
				price={product.price}
				description={product.description}
			/>
		);
	});
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>{productList}</ul>
		</section>
	);
};

export default Products;
