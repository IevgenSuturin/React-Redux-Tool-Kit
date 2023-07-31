import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const cardIsVisible = useSelector((state) => state.ui.cardIsVisible);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );

  //     await fetch(
  //       "https://react-http-ysuturin-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Sent cart data successfully!",
  //       })
  //       );
  //     };

  //     if (isInitial) {
  //       isInitial=false;
  //       return;
  //     }

  //     sendCartData().catch((error) =>
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "Sending cart data failed!",
  //       })
  //     )
  //   );
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cardIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
