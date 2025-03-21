<template>

<header
      class="h-16 flex items-center outline-none border-none p-2 z-50 fixed top-0 cursor-pointer bg-blue-700 w-full"
    >
      <div class="container flex items-center justify-around w-full px-4">
        <div class="text-2xl text-white cursor-pointer" @click="toggleSidebar">
          <Bars3Icon class="h-6 w-6 text-white cursor-pointer" />
        </div>
        <div class="text-white">
          <p class="text-2xl font-bold uppercase sm:block hidden">
            School Name
          </p>
        </div>

    
        
        <div
        :class="{
          'max-h-screen opacity-0 overflow-hidden': !isNewDropdownOpen,
          'max-max  w-2/5 opacity-100': isNewDropdownOpen,
        }"
        class="absolute start-44 top-full mt-10 text-black rounded bg-white bg-opacity-100 shadow-md py-2
         transition-all duration-300 ease-out z-100"
      >
        <div class="grid grid-cols-3 gap-4 px-4 py-2">
          <div class="flex flex-col items-center">
            <UserIcon class="h-6 w-6 text-blue-600" />
            <span class="text-sm font-medium">Students</span>
            <ul class="mt-2 space-y-1 text-xs text-gray-700 mb-32">
              <li class="hover:text-blue-500 cursor-pointer">All Students</li>
              <li class="hover:text-blue-500 cursor-pointer">Add Student</li>
              <li class="hover:text-blue-500 cursor-pointer">
                Student Reports
              </li>
            </ul>
          </div>

          <div class="flex flex-col items-center">
            <BookOpenIcon class="h-6 w-6 text-green-600" />
            <span class="text-sm font-medium">Classes</span>
            <ul class="mt-2 space-y-1 text-xs text-gray-700">
              <li class="hover:text-green-500 cursor-pointer">All Classes</li>
              <li class="hover:text-green-500 cursor-pointer">Add Class</li>
              <li class="hover:text-green-500 cursor-pointer">
                Class Schedule
              </li>
            </ul>
          </div>

          <div class="flex flex-col items-center">
            <CreditCardIcon class="h-6 w-6 text-red-600" />
            <span class="text-sm font-medium">Payments</span>
            <ul class="mt-2 space-y-1 text-xs text-gray-700">
              <li class="hover:text-red-500 cursor-pointer">All Payments</li>
              <li class="hover:text-red-500 cursor-pointer">Make Payment</li>
              <li class="hover:text-red-500 cursor-pointer">Payment Reports</li>
            </ul>
          </div>
        </div>
      </div>




        <div
          class="text-white flex items-center cursor-pointer relative"
          @click="toggleUserDropdown"
        >
          <img
            src="../assets/user.png"
            alt="User avatar"
            class="w-10 h-10 rounded-full mr-2 cursor-pointer border-2 border-white bg-white"
          />
          <ChevronDownIcon class="h-4 w-4 text-white cursor-pointer mr-2" />
          <p class="uppercase">Keneth</p>

          <ul
            :class="{
              'max-h-0 opacity-0': !isUserDropdownOpen,
              'max-h-40 opacity-100': isUserDropdownOpen,
            }"
            class="absolute right-0 top-full mt-2 text-black rounded bg-white bg-opacity-50 shadow-md py-2 w-40 transition-all duration-300 ease-out overflow-hidden z-100"
          >
            <li
              class="block px-4 py-2 hover:bg-gray-200"
              @click="navigateTo('/dash/profile')"
            >
              Profile
            </li>
            <li
              class="block px-4 py-2 hover:bg-gray-200"
              @click="navigateTo('/dash/setting')"
            >
              Settings
            </li>
            <li class="block px-4 py-2 hover:bg-gray-200" @click="logout">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </header>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
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
        icon: "UserGroupIcon",
        route: "/students",
        isOpen: false,
      },
      {
        label: "Classes",
        icon: "AcademicCapIcon",
        route: "/class",
        isOpen: false,
      },
      {
        label: "Accounts",
        icon: "CurrencyDollarIcon",
        route: "/account",
        isOpen: false,
      },

      {
        label: "Fees",
        icon: "CurrencyDollarIcon",
        route: "/fees",
        isOpen: false,
      },
      {
        label: "Procurements",
        icon: "CurrencyDollarIcon",
        route: "/procurements",
        isOpen: false,
      },
      {
        label: "Payments",
        icon: "MapIcon",
        route: "/payments",
        isOpen: false,
      },
      {
        label: "Messages",
        icon: "IconCommunity",
        route: "/messages",
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
            label: "Report 1",
            icon: "",
            route: "/reports/1",
            isOpen: false,
          },
          {
            label: "Report 2",
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