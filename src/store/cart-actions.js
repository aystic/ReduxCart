import { UIActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
//action-creators
export const sendCart = (cart) => {
	//this dispatch argument will be provided by redux and the returned function will be automatically run by redux
	return async (dispatch) => {
		dispatch(
			UIActions.setNotification({
				title: "Loading...",
				status: "processing",
				message: "Saving your cart!",
			})
		);
		const sendData = async () => {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL + "cart.json",
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
		};
		try {
			await sendData();
			dispatch(
				UIActions.setNotification({
					title: "Success",
					status: "success",
					message: "Successfully saved your cart!",
				})
			);
		} catch (err) {
			console.error(err);
			dispatch(
				UIActions.setNotification({
					title: "Error!",
					status: "error",
					message: "Failed to save your cart!",
				})
			);
		}
		setTimeout(() => {
			dispatch(UIActions.setNotification(null));
		}, 1000);
	};
};

export const fetchCart = () => {
	return async (dispatch) => {
		dispatch(
			UIActions.setNotification({
				title: "Loading...",
				status: "processing",
				message: "Fetching the card data, Please wait!",
			})
		);
		const getData = async () => {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL + "cart.json"
			);
			if (!response.ok) {
				throw new Error(
					"Some error occurred, Could not fetch the cart!"
				);
			}
			const data = await response.json();
			if (data) {
				if (!data.Items) data.Items = [];
				return data;
			}
			throw new Error("Some error occurred, Could not fetch the cart!");
		};
		try {
			const data = await getData();
			dispatch(cartActions.replaceCart(data));
			dispatch(
				UIActions.setNotification({
					title: "Success",
					status: "success",
					message: "Successfully fetched the cart data!",
				})
			);
		} catch (err) {
			console.error(err);
			dispatch(
				UIActions.setNotification({
					title: "Error!",
					status: "error",
					message: "Failed to fetch your cart!",
				})
			);
		}
		setTimeout(() => {
			dispatch(UIActions.setNotification(null));
		}, 1000);
	};
};
