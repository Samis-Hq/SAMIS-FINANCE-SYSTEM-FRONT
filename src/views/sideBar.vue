<template>

     <!-- Sidebar -->
     <div
      :class="isSidebarCollapsed ? 'w-16' : 'w-60'"
      class="sidebar-content"
    >
      <div class="mt-20">
        <hr class="border-0 border-t border-white" />
      </div>

      <ul class="sidebar-lists">
        <li
          v-for="link in links"
          :key="link.label"
          class="text-xl flex flex-col"
          @click="handleLinkClick(link)"
        >
          <div
            class="sidebar-links"
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
            class="transition-all duration-300 ease-out overflow-auto"
          >
            <li
              v-for="child in link.children"
              :key="child.label"
              class="text-sm pl-8 py-2 hover:bg-gray-400 cursor-pointer flex items-center"
              @click="navigateTo(child.route)"
            >
              <component :is="child.icon" class="h-4 w-4 mr-2" />

              <span v-if="!isSidebarCollapsed">{{ child.label }}</span>
            </li>
          </ul>
        </li>
      </ul>
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