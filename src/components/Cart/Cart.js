import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
	const items = useSelector((state) => state.cart.Items);
	const itemList = items.map((item) => {
		return (
			<CartItem
				key={item.id}
				item={{
					id: item.id,
					title: item.title,
					quantity: item.amount,
					total: item.amount * item.price,
					price: item.price,
				}}
			/>
		);
	});
	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>{itemList}</ul>
		</Card>
	);
};

export default Cart;
