import { AdminRoutesController } from "../controllers/AdminRoutesController";

export const adminRoutes = [
  {
    method: "get",
    route: "/api/admin/merchant/cashback",
    controller: AdminRoutesController,
    action: "totalAmountCashbackByMerchant",
  },
  {
    method: "get",
    route: "/api/admin/merchant/twobuyers",
    controller: AdminRoutesController,
    action: "merchantListWith2DifferentBuyers",
  },
  {
    method: "get",
    route: "/api/admin/topten",
    controller: AdminRoutesController,
    action: "topTenNonPartnerMerchant",
  },
];
