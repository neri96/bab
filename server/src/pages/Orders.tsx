import PageLayout from "../layout/PageLayout";

import { OrderContainer } from "../features/orders";

const Orders = () => {
  return (
    <PageLayout title="Orders" narrow={true}>
      <OrderContainer />
    </PageLayout>
  );
};

export default Orders;
