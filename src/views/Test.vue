<template>
    <div class="flex h-screen mt-10">
      <header
        class="h-16 flex items-center outline-none border-none p-2 z-50 fixed top-0 cursor-pointer bg-blue-700 w-full"
      >
        <div class="container flex items-center justify-around w-full px-4">
          <div class="text-2xl text-white cursor-pointer" @click="toggleSidebar">
            <Bars3Icon class="h-6 w-6 text-white cursor-pointer" />
          </div>
          <div class="text-white">
            <p class="text-xl font-bold uppercase sm:block hidden">School Name</p>
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
                @click="navigateTo('/profile')"
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
        class="transition-all duration-300 outline-none border-none cursor-pointer
         bg-blue-700 shadow-md h-full fixed top-16 left-0 z-40 font-serif  overflow-y-auto "
      >
        <div class="mt-0">
          <hr class="border-0 border-t border-white" />
        </div>
  
        <!-- <div class="mt-3">
          <hr class="border-0 border-t border-white mb-2" />
        </div> -->
  
        <ul class="space-y-4 mt-10 w-full ml-4 mb-10 text-white ">
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
              <component :is="link.icon" class="h-6 w-6 mr-4" />
  
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
              class="transition-all duration-300 ease-out overflow-auto "
            >
              <li 
                v-for="child in link.children"
                :key="child.label"
                class="text-sm pl-8 py-2 hover:bg-gray-400 cursor-pointer flex items-center"
                @click="navigateTo(child.route)"
              >
                <component :is="child.icon" class="h-4 w-4 mr-2 " />
  
                <span v-if="!isSidebarCollapsed">{{ child.label }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  
      <div
        :class="isSidebarCollapsed ? 'ml-16' : 'ml-60'"
        class="flex-1 min-h-screen pl-4 transition-all duration-300 font-serif"
      >
        <router-view />
  
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
      IconCommunity,BanknotesIcon
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
          label: "Banks",
          icon: "BanknotesIcon",
          route: "/banks",
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
              label: "General Reports",
              icon: "NewspaperIcon",
              route: "/reports/1",
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
              route: "/reports/2",
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
  