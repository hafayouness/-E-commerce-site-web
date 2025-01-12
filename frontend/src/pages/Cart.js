import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import EmptyCartImage from "../assets/empty.gif";

function Cart() {
  const productCartItem = useSelector((state) => state.product.CartItems);
  console.log(productCartItem);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl text-slate-600 font-bold">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    image={el.image}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>
            {/* total Cart item */}

            <div className=" w-full  max-w-md  ml-auto">
              <h3 className="bg-blue-500 p-2  text-white text-lg ">Summary</h3>

              <div className=" flex w-full py-2 text-lg border-b">
                <p className="ml-1">total Qty:</p>
                <p className="ml-auto w-32  font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p className="ml-1">total Price :</p>
                <p className="ml-auto w-32 font-bold">
                  {totalPrice} <span className="text-red-500">DH</span>
                </p>
              </div>
              <button className=" bg-red-500 w-full text-lg font-bold text-white py-2">
                payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full justify-center items-center">
              <img src={EmptyCartImage} alt="" className="w-full max-w-sm" />
              <p className="font-bold text-3xl text-slate-500">Empty Cart </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
