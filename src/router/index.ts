import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "@/views/Dashboard.vue";
import StudentList from "@/views/StudentList.vue";
import Classes from "@/views/Classes.vue";
import Accounts from "@/views/Accounts.vue";
import SchoolSettings from "@/views/SchoolSettings.vue";
import Payments from "@/views/Payments.vue";
import Procurements from "@/views/Procurements.vue";
import DaShboarddata from "@/views/DaShboardData.vue";
import StudentFees from "@/views/StudentFees.vue";
import Messages from "@/views/Messages.vue";
import UsersList from "@/views/UsersList.vue";
import Clients from "@/views/Clients.vue";
import UserProfile from "@/views/UserProfile.vue";
import Banks from "@/views/Banks.vue";
import Test from "@/views/Test.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },

    {
      path: "/tedst",
      name: "Test",
      component: Test,
    },

    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },

    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
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
          name: "Payments",
          component: Payments,
        },
        {
          path: "procurements",
          name: "Procurements",
          component: Procurements,
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
          path: "banks",
          name: "Manage Banks",
          component: Banks,
        },
      
      ],
    },
  ],
});

export default router;
