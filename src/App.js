import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { Fragment, useEffect } from "react";
// import { cartActions } from "./store/cart-slice";
// import { UIActions } from "./store/ui-slice";
import { sendCart, fetchCart } from "./store/cart-actions";
let initialRun = true;
function App() {
	const dispatch = useDispatch();
	const cartVisibility = useSelector((state) => state.ui.cartVisibility);
	const notificationData = useSelector((state) => state.ui.notification);
	const cart = useSelector((state) => state.cart);
	useEffect(() => {
		if (!initialRun) {
			dispatch(sendCart(cart));
		}
		initialRun = false;
	}, [cart, dispatch]);
	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);
	return (
		<Fragment>
			{notificationData && (
				<Notification
					title={notificationData.title}
					status={notificationData.status}
					message={notificationData.message}
				/>
			)}
			<Layout>
				{cartVisibility && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;

/* useEffect(() => {
		const getCart = async () => {
			dispatch(
				UIActions.setNotification({
					title: "Loading...",
					status: "processing",
					message: "Fetching the card data, Please wait!",
				})
			);
			const response = await fetch(
				"https://redux-cart-a206a-default-rtdb.firebaseio.com/cart.json"
			);
			if (!response.ok) {
				throw new Error(
					"Some error occurred, Could not fetch the cart!"
				);
			}
			const data = await response.json();
			if (data) {
				dispatch(cartActions.replaceCart(data));
				dispatch(
					UIActions.setNotification({
						title: "Success",
						status: "success",
						message: "Successfully fetched the cart data!",
					})
				);
			}
			setTimeout(() => {
				dispatch(UIActions.setNotification(null));
			}, 1000);
		};
		const sendCart = async () => {
			dispatch(
				UIActions.setNotification({
					title: "Loading...",
					status: "processing",
					message: "Saving your cart!",
				})
			);
			const response = await fetch(
				"https://redux-cart-a206a-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(cart),
				}
			);
			if (!response.ok) {
				throw new Error(
					`Some error occurred, Couldn't send the cart data!`
				);
			}
			dispatch(
				UIActions.setNotification({
					title: "Success",
					status: "success",
					message: "Successfully saved your cart!",
				})
			);
			setTimeout(() => {
				dispatch(UIActions.setNotification(null));
			}, 1000);
		};
		if (!initialRun) {
			sendCart().catch((err) => {
				console.error(err);
				dispatch(
					UIActions.setNotification({
						title: "Error!",
						status: "error",
						message: "Failed to save your cart!",
					})
				);
				setTimeout(() => {
					dispatch(UIActions.setNotification(null));
				}, 1000);
			});
		}
		if (initialRun) {
			getCart().catch((err) => {
				console.error(err);
				dispatch(
					UIActions.setNotification({
						title: "Error!",
						status: "error",
						message: "Failed to fetch your cart!",
					})
				);
				setTimeout(() => {
					dispatch(UIActions.setNotification(null));
				}, 1000);
			});
			initialRun = false;
		}
	}, [cart, dispatch]); */
