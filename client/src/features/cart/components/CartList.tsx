import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";

import cloneDeep from "lodash.clonedeep";

import { useGetSettingDataQuery } from "../../../api/services/settings";

import CartDetails from "./CartDetails";
import Button from "../../../components/Button";

import useRequest from "../../../hooks/useRequest";
import useCartData from "../../../hooks/useCartData";

import * as storage from "../../../utils/localStorage";

import { Settings, ReqMethod } from "../../../ts/types";
import { CartData, CartProduct } from "../../../ts/interfaces";

const CartList = ({ cartData }: { cartData: CartData }) => {
  const navigate = useNavigate();

  const { data: ordersData } = useGetSettingDataQuery(Settings.Orders);

  const { sendRequest } = useRequest();
  const { modifyCartData } = useCartData();

  useEffect(() => {
    if (cartData.items.length) {
      (async () => {
        const response = await sendRequest({
          method: ReqMethod.Post,
          url: "cart/images",
          body: { ids: cartData.items.map((item) => item.id) },
        });

        modifyCartData(() => {
          storage.setImgUrl(response?.data);
        });
      })();
    }
  }, []);

  return (
    <>
      {cartData.items.map((product: CartProduct) => {
        return <CartDetails key={uuid()} product={product} />;
      })}

      {ordersData?.mode ? (
        <Button
          handleClick={() =>
            navigate("/checkout", { state: { fromCart: true } })
          }
        >
          Checkout
        </Button>
      ) : null}
    </>
  );
};

export default CartList;
