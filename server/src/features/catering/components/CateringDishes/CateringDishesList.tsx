import CateringDishesDetails from "./CateringDishesDetails";

import "./CateringDishesList.scss";

import { IDish } from "../../../../ts/interfaces";

const CateringDishesList = ({
  cateringDishes,
}: {
  cateringDishes: IDish[];
}) => {
  console.log(cateringDishes);

  return !cateringDishes.length ? (
    <div className="catering-dishes__empty">
      <h3>This section is currently empty</h3>
    </div>
  ) : (
    <div className="catering-dishes__body">
      {cateringDishes.map((dish: IDish, i: number) => (
        <CateringDishesDetails key={dish._id} index={i} dish={dish} />
      ))}
    </div>
  );
};

export default CateringDishesList;
