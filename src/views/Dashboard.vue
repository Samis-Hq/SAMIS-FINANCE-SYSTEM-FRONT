<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div :class="isSidebarCollapsed ? 'w-16' : 'w-60'" class="sidebar-content bg-gray-800 text-white">
      <div class="mt-20">
        <hr class="border-0 border-t border-white"/>
      </div>

      <ul class="sidebar-lists">
        <li
            v-for="link in links"
            :key="link.label"
            class="flex flex-col"
            @click="handleLinkClick(link)"
        >
          <div class="sidebar-links" :class="{ active: isLinkActive(link) }">
            <component
                :is="iconComponents[link.icon]"
                class="h-6 w-6 mr-4"
                v-if="iconComponents[link.icon]"
            />
            <span v-if="!isSidebarCollapsed">{{ link.label }}</span>
            <ChevronDownIcon
                v-if="link.children"
                class="h-4 w-4 ml-20"
                :class="{ 'rotate-180': link.isOpen }"
            />
          </div>
          <ul
              v-if="link.children"
              :class="{
              'max-h-0 opacity-0': !link.isOpen,
              'max-h-40 opacity-100': link.isOpen,
            }"
              class="transition-all duration-300 ease-out overflow-auto bg-blue-100"
          >
            <li
                v-for="child in link.children"
                :key="child.label"
                class="text-sm pl-8 py-2 hover:bg-gray-400 cursor-pointer flex items-center"
                @click="navigateTo(child.route)"
            >
              <component
                  :is="iconComponents[child.icon]"
                  class="h-4 w-4 mr-2"
                  v-if="iconComponents[child.icon]"
              />
              <span v-if="!isSidebarCollapsed">{{ child.label }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div
        class="flex-1 flex flex-col transition-all duration-300"
        :class="isSidebarCollapsed ? 'ml-16' : 'ml-60'"
    >
      <header
          class="bg-gray-200 h-16 fixed z-10"
          :class="isSidebarCollapsed ? 'left-16' : 'left-60'"
          :style="{
          width: isSidebarCollapsed
            ? 'calc(100% - 4rem)'
            : 'calc(100% - 15rem)',
        }"
      >
        <div class="container flex items-center justify-between h-full px-4">
          <div class="flex items-center gap-4">
            <div class="text-2xl text-black cursor-pointer" @click="toggleSidebar">
              <Bars3Icon class="h-6 w-6 mr-8 text-black cursor-pointer"/>
            </div>
            </p>
          </div>
          <div class="flex items-center">
            <div
                class="text-black flex items-center cursor-pointer relative mr-20"
                @click="toggleUserDropdown"
            >
              <ChevronDownIcon
                  class="h-4 w-4 text-blue-900 cursor-pointer text-bold font-bold md:ml-4"
                  :class="{ 'rotate-180': isUserDropdownOpen }"
              />

              <ul
                  :class="{
                  'max-h-0 opacity-0': !isUserDropdownOpen,
                  'max-h-80 opacity-200': isUserDropdownOpen,
                }"
                  class="user-profile-dropdown"
              >
                <li class="profile-list" @click="navigateTo('/profile')">
                  Profile
                </li>
                <li class="profile-list" @click="navigateTo('/dash/setting')">
                  Settings
                </li>
                <div class="mt-2">
                  <hr class="border-0 border-t border-gray-500"/>
                </div>
                <li class="profile-list" @click="navigateTo('/setting')">
                  Terms Of Service
                </li>
                <li class="profile-list" @click="navigateTo('/setting')">
                  Privacy and Policy
                </li>
                <li class="profile-list" @click="navigateTo('/setting')">
                  System User Manual
                </li>
                <div class="mt-2">
                  <hr class="border-0 border-t border-gray-500"/>
                </div>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div class="main-content font-serif" :style="{ paddingTop: '4rem' }">
        <div class="mt-0">
          <hr class="border-0 border-t border-gray-300"/>
        </div>
        <router-view></router-view>
        <a
            href="https://wa.me/254711082779"
            target="_blank"
            class="fixed bottom-5 right-5 bg-green-500 p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 z-50"
        >
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              class="w-12 h-12"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Bars3Icon,
  HomeIcon,
  AcademicCapIcon,
  CogIcon,
  ChevronDownIcon,
  UserCircleIcon,
  NewspaperIcon,
  BookOpenIcon,
  CreditCardIcon,XMarkIcon,
  CurrencyDollarIcon,CurrencyBangladeshiIcon,
  MapIcon,ChartPieIcon,ClipboardDocumentListIcon,FolderMinusIcon,SignalIcon
} from "@heroicons/vue/24/outline";
import IconCommunity from "@/components/icons/IconCommunity.vue";

const isSidebarCollapsed = ref(false);
const isUserDropdownOpen = ref(false);
const isNewDropdownOpen = ref(false);

// Icon component mapping
const iconComponents = {
  HomeIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  MapIcon,ChartPieIcon,
  IconCommunity,
  UserCircleIcon,
  NewspaperIcon,
  CogIcon,SignalIcon,
  CreditCardIcon,CurrencyBangladeshiIcon,
  BookOpenIcon,ClipboardDocumentListIcon,FolderMinusIcon
};

interface Link {
  label: string;
  icon: keyof typeof iconComponents;
  route: string;
  isOpen: boolean;
  children?: Link[];
}

const links = ref<Link[]>([
  {
    label: "Dashboard",
    icon: "HomeIcon",
    route: "/",
    isOpen: false,
  },
  {
    label: "Students",
    icon: "AcademicCapIcon",
    route: "/students",
    isOpen: false,
  },
  {
    label: "Fees",
    icon: "CurrencyBangladeshiIcon",
    route: "/fees",
    isOpen: false,
  },
  {
    label: "Accounting",
    icon: "CurrencyDollarIcon",
    route: "/account",
    isOpen: false,
  },
  {
    label: "Other Incomes",
    icon: "ChartPieIcon",
    route: "/others",
    isOpen: false,
  },
  {
    label: "Invoicing",
    icon: "ClipboardDocumentListIcon",
    route: "/procurements",
    isOpen: false,
  },
  {
    label: "Expenses",
    icon: "FolderMinusIcon",
    route: "/payments",
    isOpen: false,
  },
  {
    label: "Payroll",
    icon: "MapIcon",
    route: "/payroll",
    isOpen: false,
  },
  {
    label: "Messaging",
    icon: "IconCommunity",
    route: "/messages",
    isOpen: false,
  },
  {
    label: "PocketMoney",
    icon: "MapIcon",
    route: "/pocket",
    isOpen: false,
  },
  {
    label: "Users",
    icon: "UserCircleIcon",
    route: "/users",
    isOpen: false,
  },
  {
    label: "Reports",
    icon: "NewspaperIcon",
    route: "/reports",
    isOpen: false,
    children: [
      {
        label: "Class Lists",
        icon: "NewspaperIcon",
        route: "/reports/classlist",
        isOpen: false,
      },
      {
        label: "Receipts",
        icon: "CreditCardIcon",
        route: "/reports/receipts",
        isOpen: false,
      },
      {
        label: "Fees Reports",
        icon: "CurrencyDollarIcon",
        route: "/reports/statement",
        isOpen: false,
      },
      {
        label: "Expenditure Reports",
        icon: "BookOpenIcon",
        route: "/reports/expenditure",
        isOpen: false,
      },
      {
        label: "Financial Reports",
        icon: "CurrencyDollarIcon",
        route: "/reports/financial",
        isOpen: false,
      },
      {
        label: "IPSAS Reports",
        icon: "BookOpenIcon",
        route: "/reports/ipsas",
        isOpen: false,
      },
    ],
  },
  {
    label: "Settings",
    icon: "CogIcon",
    route: "/settings",
    isOpen: false,
  },
  {
    label: "Updates",
    icon: "SignalIcon",
    route: "/updates",
    isOpen: false,
  },
]);

const router = useRouter();
const route = useRoute();

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const toggleNewItemsDropdown = () => {
  isNewDropdownOpen.value = !isNewDropdownOpen.value;
};

const handleLinkClick = (link: Link) => {
  if (link.children) {
    link.isOpen = !link.isOpen;
    if (!link.route || link.route === "#") {
      navigateTo(link.children[0].route);
    }
  } else {
    navigateTo(link.route);
  }
};

const navigateTo = (routePath: string) => {
  router.push(routePath);
};

const isLinkActive = (link: Link): boolean => {
  if (link.route === "/") {
    return route.path === "/";
  }

  if (route.path === link.route) {
    return true;
  }

  if (route.path.startsWith(link.route + "/")) {
    return true;
  }

  if (link.children) {
    return link.children.some(child =>
        route.path === child.route ||
        route.path.startsWith(child.route + "/")
    );
  }

  return false;
};

const logout = () => {
  console.log("User logged out");

};
</script>
