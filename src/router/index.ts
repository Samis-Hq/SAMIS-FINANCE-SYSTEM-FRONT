import { createRouter, createWebHistory } from "vue-router";
import { useAuthenticationStore } from "@/stores/AuthenticationStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { guestOnly: true }
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("@/views/Test.vue")
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/ProductsView.vue")
    },
    {
      path: "/auth",
      name: "Authenticate",
      component: () => import("@/views/Logins.vue"),
      meta: { guestOnly: true }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue")
    },
    {
      path: "/dash",
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
       meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/views/DaShboardData.vue")
        },

        {
          path: "students",
          name: "Students",
          component: () => import("@/views/StudentList.vue")
        },
        {
          path: "fees",
          name: "StudentFees",
          component: () => import("@/views/StudentFees.vue")
        },
        {
          path: "pocket-money",
          name: "PocketMoney",
          component: () => import("@/views/PocketMoney.vue")
        },
        {
          path: "classes",
          name: "Classes",
          component: () => import("@/views/Classes.vue")
        },
        {
          path: "fee-structure",
          name: "FeeStructure",
          component: () => import("@/views/SchoolFeeStructure.vue")
        },
        {
          path: "bursary",
          name: "Bursary",
          component: () => import("@/views/Bursary.vue")
        },
        {
          path: "accounts",
          name: "Accounts",
          component: () => import("@/views/Accounts.vue")
        },
        {
          path: "expenses",
          name: "SchoolExpenses",
          component: () => import("@/views/SchoolExpenses.vue")
        },
        {
          path: "invoices",
          name: "Invoices",
          component: () => import("@/views/SchoolInvoices.vue")
        },
        {
          path: "other-incomes",
          name: "SchoolIncomes",
          component: () => import("@/views/OtherIncomes.vue")
        },
        {
          path: "banks",
          name: "ManageBanks",
          component: () => import("@/views/Banks.vue")
        },
        {
          path: "users",
          name: "Users",
          component: () => import("@/views/UsersList.vue")
        },
        {
          path: "profile",
          name: "UserProfile",
          component: () => import("@/views/UserProfile.vue")
        },
        {
          path: "clients",
          name: "Clients",
          component: () => import("@/views/Clients.vue")
        },
        {
          path: "payroll",
          name: "Payroll",
          component: () => import("@/views/Clients.vue")
        },
        {
          path: "messages",
          name: "Messages",
          component: () => import("@/views/Messages.vue")
        },
        {
          path: "reports",
          name: "Reports",
          component: () => import("@/views/ReportsView.vue"),
          children: [
            {
              path: "class-list",
              name: "ClassListReports",
              component: () => import("@/views/Reports/ClassListReports.vue")
            },
            {
              path: "fee-statements",
              name: "FeeStatementReports",
              component: () => import("@/views/Reports/FeeStatementReports.vue")
            },
            {
              path: "receipts",
              name: "ReceiptsReports",
              component: () => import("@/views/Reports/ReceiptsReports.vue")
            }
          ]
        },
        {
          path: "settings",
          name: "SchoolSettings",
          component: () => import("@/views/SchoolSettings.vue")
        },
        {
          path: "uploads",
          name: "Uploads",
          component: () => import("@/views/Uploads.vue")
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue")
    }
  ]
});
router.beforeEach((to) => {
  const authStore = useAuthenticationStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticatedWithCheck) {
    return { name: "home" };
  }

  // Check if route is for guests only
  if (to.meta.guestOnly && authStore.isAuthenticatedWithCheck) {
    return { name: "dashboard" };
  }

  // Continue with navigation
  return true;
});

export default router;