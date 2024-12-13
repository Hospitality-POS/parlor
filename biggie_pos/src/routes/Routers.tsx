import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "@components/spinner/Spinner";
import Private from "@components/layout/private/Private";
import MainCategory from "@pages/main_category/Main_category";

import NotFound from "@routes/NotFound";

import { Spin } from "antd/lib";
import { COOP_NAME } from "@utils/config";
import MainOrders from "@pages/Orders/MainOrders";
import NubaLoader from "@components/spinner/NubaLoader";

const Layout = lazy(() => import("@components/layout/Layout"));

const RestaurantPage = lazy(() => import("@pages/Restaurant/Restuarant"));
const MainStore = lazy(() => import("@pages/store/MainStore"));
const Orders = lazy(() => import("@pages/Orders/Orders"));
const Table = lazy(() => import("@pages/Tables/TablePro"));

// App list - settings
const PaymentMainSettings = lazy(
  () => import("@pages/Settings/paymentMethodLevel/payment_main_settings")
);
const UsersMainSettings = lazy(
  () => import("@pages/Settings/usersLevel/User_main_settings")
);
const InventoryMainSettings = lazy(
  () => import("@pages/Settings/invetoryLevel/Inventory_main_settings")
);
const SupplierMainSettings = lazy(
  () => import("@pages/Settings/supplierLevel/supplier_main_settings")
);
const TableMainSettings = lazy(
  () => import("@pages/Settings/TableLevel/Table_main_settings")
);
const SystemSetup = lazy(
  () => import("@pages/Settings/systemSetup/SystemSetup")
);
const CategoryMainSettings = lazy(
  () => import("@pages/Settings/categoryLevel/Category_main_settings")
);
const Reports = lazy(() => import("@pages/Settings/reportsLevel/Reports"));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin
                size="large"
                fullscreen
                tip="Getting you tables please wait..."
                indicator={<NubaLoader />}
              />
            }
          >
            <Table />
          </Suspense>
        }
      />
      <Route
        path="/tables"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin
                size="large"
                fullscreen
                tip="Getting you tables please wait..."
                indicator={<NubaLoader />}
              />
            }
          >
            <Table />
          </Suspense>
        }
      />
      <Route
        path="/main-category"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <MainCategory />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/dashboard/:id"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <RestaurantPage />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/store"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <MainStore />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/users"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <UsersMainSettings />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/reports"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <Reports />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/suppliers"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <SupplierMainSettings />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/table-settings"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <TableMainSettings />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/category-settings"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <CategoryMainSettings />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/payment-methods"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <PaymentMainSettings />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/system-setup"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <SystemSetup />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/inventory"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <InventoryMainSettings />
            </Private>
          </Suspense>
        }
      />
      <Route
        path="/orders"
        errorElement={<NotFound />}
        element={
          <Suspense
            fallback={
              <Spin size="large" fullscreen indicator={<NubaLoader />} />
            }
          >
            <Private>
              <MainOrders />
            </Private>
          </Suspense>
        }
        // errorElement={<NotFound/>}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


function Routers() {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          fullscreen
          tip={`welcome to ${COOP_NAME}`}
          indicator={<NubaLoader />}
        />
      }
    >
      {setTimeout(() => {
        return true;
      }, 5000) && <RouterProvider router={routes} />}
    </Suspense>
  );
}

export default Routers;
