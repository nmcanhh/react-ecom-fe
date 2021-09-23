import Dashboard from "../components/admin/Dashboard";
import Category from "../components/admin/Category";
import ViewCategory from "../components/admin/ViewCategory";
import EditCategory from "../components/admin/EditCategory";
import Profile from "../components/admin/Profile";

const routes = [
  {
    path: "/admin",
    exact: true,
    name: "Admin",
  },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/add-category",
    exact: true,
    name: "Category",
    component: Category,
  },
  {
    path: "/admin/view-category",
    exact: true,
    name: "View Category",
    component: ViewCategory,
  },
  {
    path: "/admin/edit-category/:id",
    exact: true,
    name: "Edit Category",
    component: EditCategory,
  },

  {
    path: "/admin/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
];

export default routes;
