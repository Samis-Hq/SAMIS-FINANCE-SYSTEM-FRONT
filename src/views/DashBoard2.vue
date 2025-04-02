<template>
  <div class="flex h-screen mt-10">
    <header
        class="h-16 flex items-center outline-none border-none p-2 z-50 fixed top-0 cursor-pointer bg-blue-700 w-full"
    >
      <div class="container flex items-center justify-around w-full px-4">
        <div class="text-2xl text-white cursor-pointer" @click="toggleSidebar">
          <Bars3Icon class="h-6 w-6 text-white cursor-pointer"/>
        </div>
        <div class="text-white">
          <p class="text-2xl font-bold uppercase sm:block hidden">
            School Name
          </p>
        </div>


        <div
            :class="{
            'max-h-screen opacity-0 overflow-hidden': !isNewDropdownOpen,
            'max-max  w-5/6 opacity-100': isNewDropdownOpen,
          }"
            class="absolute start-44 top-full mt-10 text-black rounded bg-white bg-opacity-100 shadow-md py-2
           transition-all duration-300 ease-out z-100"
        >
          <div class="grid grid-cols-4 gap-4">
            <div class="flex flex-col items-center">
              <UserIcon class="h-6 w-6 text-blue-600"/>
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
              <BookOpenIcon class="h-6 w-6 text-green-600"/>
              <span class="text-sm font-medium">Invoices</span>
              <ul class="mt-2 space-y-1 text-xs text-gray-700">
                <li class="hover:text-green-500 cursor-pointer">All Invoices</li>
                <li class="hover:text-green-500 cursor-pointer">Add Invoice</li>
                <li class="hover:text-green-500 cursor-pointer">
                  Add Lpo
                </li>
                <li class="hover:text-green-500 cursor-pointer">
                  Add LSo
                </li>
              </ul>
            </div>


            <div class="flex flex-col items-center">
              <BookOpenIcon class="h-6 w-6 text-green-600"/>
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
              <CreditCardIcon class="h-6 w-6 text-red-600"/>
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
          <ChevronDownIcon class="h-4 w-4 text-white cursor-pointer mr-2"/>
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
    <div
        :class="isSidebarCollapsed ? 'w-16' : 'w-60'"
        class="transition-all duration-300 outline-none border-none cursor-pointer bg-blue-700 shadow-md h-full fixed top-16 left-0 z-40 font-serif"
    >
      <div class="mt-0">
        <hr class="border-0 border-t border-white"/>
      </div>

      <div class="flex mt-2 justify-center cursor-pointer relative">
        <button
            @click="toggleNewItemsDropdown"
            class="flex items-center gap-2 mr-2 cursor-pointer border-2 border-none bg-gray-900 bg-opacity-50 text-white rounded-lg shadow-md px-4 py-2"
        >
          <PlusIcon class="h-6 w-6 text-white cursor-pointer"/>
          <span>New</span>
        </button>
      </div>


      <div class="mt-3">
        <hr class="border-0 border-t border-white mb-2"/>
      </div>

      <ul class="space-y-4 w-full ml-4 mb-10 text-white">
        <li
            v-for="link in links"
            :key="link.label"
            class="text-xl flex flex-col"
            @click="handleLinkClick(link)"
        >
          <div
              class="flex items-center cursor-pointer hover:text-blue-900"
              :class="{ active: isLinkActive(link) }"
          >
            <component :is="link.icon" class="h-6 w-6 mr-4"/>

            <span v-if="!isSidebarCollapsed">{{ link.label }}</span>

            <ChevronDownIcon
                v-if="link.children"
                class="h-4 w-4 ml-4"
                :class="{ 'rotate-180': link.isOpen }"
            />
          </div>
          <ul
              v-if="link.children"
              :class="{
                'max-h-0 opacity-0': !link.isOpen,
                'max-h-40 opacity-100': link.isOpen,
              }"
              class="transition-all duration-300 ease-out overflow-hidden"
          >
            <li
                v-for="child in link.children"
                :key="child.label"
                class="text-lg pl-8 py-2 hover:bg-gray-400 cursor-pointer"
                @click="navigateTo(child.route)"
            >
              <component :is="child.icon" class="h-5 w-5"/>

              <span v-if="!isSidebarCollapsed">{{ child.label }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div
        :class="isSidebarCollapsed ? 'ml-16' : 'ml-60'"
        class="flex-1 min-h-screen pl-4 transition-all duration-300 font-serif "
    >
      <router-view/>
      <OccasionMessages/>
      <a
          href="https://wa.me/254711766223"
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
} from "@heroicons/vue/24/outline";
import IconCommunity from "@/components/icons/IconCommunity.vue";
import OccasionMessages from "@/views/OccasionMessages.vue";

export default {
  components: {
    OccasionMessages,
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
  
  
  