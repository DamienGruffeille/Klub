import { AdminRoutesController } from "../controllers/AdminRoutesController";

export const adminRoutes = [
  {
    method: "get",
    route: "/admin/totalcashbackbymerchant",
    controller: AdminRoutesController,
    action: "totalAmountCashbackByMerchant",
  },
  {
    method: "get",
    route: "/admin/merchantListWith2DifferentBuyers",
    controller: AdminRoutesController,
    action: "merchantListWith2DifferentBuyers",
  },
  {
    method: "get",
    route: "/admin/topten",
    controller: AdminRoutesController,
    action: "topTenNonPartnerMerchant",
  },
];
