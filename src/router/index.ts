import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "@/views/Dashboard.vue";
import StudentList from "@/views/StudentList.vue";
import Classes from "@/views/Classes.vue";
import Accounts from "@/views/Accounts.vue";
import SchoolSettings from "@/views/SchoolSettings.vue";
import SchoolExpenses from "@/views/SchoolExpenses.vue";
import SchoolInvoices from "@/views/SchoolInvoices.vue";
import DaShboarddata from "@/views/DaShboardData.vue";
import StudentFees from "@/views/StudentFees.vue";
import Messages from "@/views/Messages.vue";
import UsersList from "@/views/UsersList.vue";
import Clients from "@/views/Clients.vue";
import UserProfile from "@/views/UserProfile.vue";
import Banks from "@/views/Banks.vue";
import Test from "@/views/Test.vue";
import Uploads from "@/views/Uploads.vue";
import ReportsView from "@/views/ReportsView.vue";
import Bursary from "@/views/Bursary.vue";
import OtherIncomes from "@/views/OtherIncomes.vue";
import PocketMoney from "@/views/PocketMoney.vue";
import NotFound from "@/views/NotFound.vue";
import Logins from "@/views/Logins.vue";
import FessStructure from "@/views/FessStructure.vue";
import ClassListReports from "@/views/Reports/ClassListReports.vue";
import FeeStatementReports from "@/views/Reports/FeeStatementReports.vue";
import ReceiptsReports from "@/views/Reports/ReceiptsReports.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
    },
    {
      path: "/auth",
      name: "Authenticate",
      component: Logins  ,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/",
      name: "dashboard",
      component: ()=>import("../views/Dashboard.vue"),
      children: [
        {
          path: "",
          name: "Dashboard",
          component: DaShboarddata,
        },
        {
          path: "students",
          name: "Students",
          component: StudentList,
        },
        {
          path: "account",
          name: "Accounts",
          component: Accounts,
        },
        {
          path: "fees",
          name: "Fees",
          component: StudentFees,
        },
        {
          path: "class",
          name: "Classes",
          component: Classes,
        },
        {
          path: "users",
          name: "Users",
          component: UsersList,
        },
        {
          path: "messages",
          name: "Message",
          component: Messages,
        },
        {
          path: "settings",
          name: "Settings",
          component: SchoolSettings,
        },
        {
          path: "payments",
          name: "SchoolExpenses",
          component: SchoolExpenses,
        },
        {
          path: "procurements",
          name: "SchoolInvoices",
          component: SchoolInvoices,
        },
        {
          path: "clients",
          name: "Clients",
          component: Clients,
        },
        {
          path: "profile",
          name: "User Profile",
          component: UserProfile,
        },
        {
          path: "others",
          name: "School Incomes",
          component: OtherIncomes,
        },
        {
          path: "banks",
          name: "Manage Banks",
          component: Banks,
        },
        {
          path: "uploads",
          name: "Upload External Data",
          component: Uploads,
        },
        {
          path: "bursary",
          name: "Manage Bursaries",
          component: Bursary,
        },
        {
          path: "structure",
          name: "Fee structure",
          component: FessStructure,
        },
        {
          path: "reports",
          name: "School Reports",
          component: ReportsView  ,
          children:[
            {
              path: "classlist",
              name: "Class list Reports",
              component: ClassListReports  ,
            },

            {
              path: "statement",
              name: "Fee Statement Reports",
              component: FeeStatementReports  ,
            },

            {
              path: "receipts",
              name: "Fee Receipts",
              component: ReceiptsReports  ,
            },

          ]
        },
        {
          path: "pocket",
          name: "Students Pocket Money",
          component: PocketMoney  ,
        },
      
      ],
    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ],
});
export default router;
