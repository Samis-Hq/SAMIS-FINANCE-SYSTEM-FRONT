<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div :class="isSidebarCollapsed ? 'w-16' : 'w-60'" class="sidebar-content">
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
            <component :is="link.icon" class="h-6 w-6 mr-4"/>
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
              <component :is="child.icon" class="h-4 w-4 mr-2"/>
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
              <Bars3Icon class="h-6 w-6 mr-8  text-black cursor-pointer"/>
            </div>
            <p class="text-xl  text-center capitalize hidden sm:block">
              School Name
            </p>
          </div>
          <div class="flex items-center">
            <div class="text-black flex items-center cursor-pointer relative  mr-20"
                 @click="toggleUserDropdown"
            >
              <!--              <img src="../assets/user.png" alt="User avatar" class="user-profile"/>-->

              <p class="capitalize text-sm hidden sm:inline">Keneth Korir</p>
              <ChevronDoubleDownIcon
                  class="h-4 w-4 text-blue-900 cursor-pointer mr-2 text-bold font-bold ml-2"
                  :class="{ 'rotate-180': isUserDropdownOpen }"/>

              <ul
                  :class="{
          'max-h-0 opacity-0': !isUserDropdownOpen,
          'max-h-80 opacity-200': isUserDropdownOpen,
        }" class="user-profile-dropdown">
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
                <li class="profile-list" @click="logout">
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

<script lang="ts">
import {ref, onMounted} from "vue";
import {useRouter, useRoute, RouterView} from "vue-router";
import {
  Bars3Icon,
  HomeIcon,
  AcademicCapIcon,
  CogIcon,
  ChevronDownIcon,
  UserGroupIcon,
  UserCircleIcon,
  ChevronDoubleDownIcon,
  NewspaperIcon,
  ChevronUpDownIcon,
  BookOpenIcon,
  CreditCardIcon,
  UserIcon,
  PlusIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyYenIcon,
  MapIcon,
  BanknotesIcon,
} from "@heroicons/vue/24/outline";
import IconCommunity from "@/components/icons/IconCommunity.vue";

export default {
  components: {
    Bars3Icon,
    HomeIcon,
    AcademicCapIcon,
    CogIcon,
    ChevronDownIcon,
    UserGroupIcon,
    UserCircleIcon,
    ChevronDoubleDownIcon,
    NewspaperIcon,
    PlusIcon,
    BookOpenIcon,
    CreditCardIcon,
    UserIcon,
    CurrencyDollarIcon,
    CurrencyEuroIcon,
    CurrencyPoundIcon,
    CurrencyYenIcon,
    MapIcon,
    IconCommunity,
    BanknotesIcon,
  },
  setup() {
    const isSidebarCollapsed = ref(false);
    const isUserDropdownOpen = ref(false);
    const isNewDropdownOpen = ref(false);

    const userLogo = ref("../assets/user.png");
    const schoolLogo = ref("../assets/user.png");

    interface Link {
      label: string;
      icon: string;
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
        icon: "CurrencyDollarIcon",
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
        icon: "CurrencyDollarIcon",
        route: "/others",
        isOpen: false,
      },

      {
        label: "Invoicing",
        icon: "CurrencyDollarIcon",
        route: "/procurements",
        isOpen: false,
      },
      {
        label: "Expenses",
        icon: "MapIcon",
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
            route: "/classlist",
            isOpen: false,
          },
          {
            label: "Receipts",
            icon: "",
            route: "/reports/2",
            isOpen: false,
          },
          {
            label: "Fees Reorts",
            icon: "",
            route: "/statement",
            isOpen: false,
          },
          {
            label: "Expenditure Reports",
            icon: "",
            route: "/reports/2",
            isOpen: false,
          },

          {
            label: "Financial Reports",
            icon: "",
            route: "/reports/2",
            isOpen: false,
          },
          {
            label: "IPSAS Reports",
            icon: "",
            route: "/reports/2",
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
      console.log("New items dropdown toggled");
      //  alert("New items dropdown toggled");
    };

    const handleLinkClick = (link: Link) => {
      if (link.children) {
        link.isOpen = !link.isOpen;
      } else {
        navigateTo(link.route);
      }
    };

    const navigateTo = (route: string) => {
      router.push(route);
    };

    const isLinkActive = (link: Link): boolean => {
      return route.path === link.route;
    };

    const logout = () => {
      console.log("User logged out");
    };

    return {
      isSidebarCollapsed,
      isUserDropdownOpen,
      isNewDropdownOpen,
      userLogo,
      schoolLogo,
      links,
      toggleSidebar,
      toggleUserDropdown,
      toggleNewItemsDropdown,
      handleLinkClick,
      navigateTo,
      isLinkActive,
      logout,
    };
  },
};
</script>
