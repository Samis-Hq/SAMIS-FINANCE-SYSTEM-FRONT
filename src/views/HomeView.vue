<template>
  <div class="min-h-screen flex flex-col font-serif">
    <header
        ref="header"
        class="fixed top-0 left-0 w-full p-4 z-50 transition-all duration-300"
        :class="{
        'bg-transparent text-white': isAtTop,
        'bg-blue-300 text-black shadow-md': !isAtTop
      }"
    >
      <div class="container mx-auto flex justify-around items-center">
        <div class="text-3xl font-custom tracking-[.1em]">SAMIS FiNANCE</div>
        <nav class="flex gap-6">
          <button @click="scrollToSection('home')" class="text-xl capitalize hover:text-white transition-colors">
            Home
          </button>
          <button @click="scrollToSection('about')" class="text-xl capitalize hover:text-white transition-colors">
            About
          </button>
          <button @click="scrollToSection('features')" class="text-xl capitalize hover:text-white transition-colors">
            Features
          </button>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <section
          id="home"
          ref="homeSection"
          class="relative flex items-center justify-start text-white"
      >
        <div class="absolute inset-0 bg-[url('../assets/acc.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent backdrop-blur-sm"></div>
        <div class="relative z-10 text-left font-serif pl-20">
          <h1 class="text-4xl font-bold mb-4 text-white">SAMIS FINANCE SYSTEM</h1>
          <p class="text-xl">Manage financial activities easily.</p>
          <div class="mt-10">
            <router-link to="/" class="my-button">LOGIN HERE</router-link>
          </div>
        </div>
      </section>

      <section id="about" class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-blue-400 mb-2">About</h2>
          <div class="w-20 h-1.5 bg-blue-400 mx-auto mb-8 "></div>
          <div class="flex justify-center">
            <div class="max-w-4xl">
              <p class="text-center text-lg">
                SAMIS Finance System is a comprehensive school finance management system designed to streamline financial
                operations within educational institutions. It provides robust tools for managing students, receipts,
                fees, and expenditures efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="py-16 bg-blue-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-2 text-blue-400">Features</h2>
          <div class="w-32 h-1.5 bg-blue-400 mx-auto mb-8 "></div>
          <div class="flex justify-center">
            <div class="w-full max-w-6xl">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="feature-card">
                  <div class="flex items-center mb-4">
                    <AcademicCapIcon class="h-8 w-8 text-blue-500 mr-3"/>
                    <h3 class="text-xl font-bold">Fees Collection</h3>
                  </div>
                  <p class="text-gray-700">
                    Collect fees easily with our streamlined payment system.
                  </p>
                </div>
                <div class="feature-card">
                  <div class="flex items-center mb-4">
                    <MapIcon class="h-8 w-8 text-blue-500 mr-3"/>
                    <h3 class="text-xl font-bold">Reports</h3>
                  </div>
                  <p class="text-gray-700">
                    Generate comprehensive financial reports with one click.
                  </p>
                </div>
                <div class="feature-card">
                  <div class="flex items-center mb-4">
                    <CurrencyBangladeshiIcon class="h-8 w-8 text-blue-500 mr-3"/>
                    <h3 class="text-xl font-bold">Bursaries</h3>
                  </div>
                  <p class="text-gray-700">
                    Manage student bursaries and financial aid efficiently.
                  </p>
                </div>
                <div class="feature-card">
                  <div class="flex items-center mb-4">
                    <PlusCircleIcon class="h-8 w-8 text-blue-500 mr-3"/>
                    <h3 class="text-xl font-bold">Import Data</h3>
                  </div>
                  <p class="text-gray-700">
                    Easily migrate your existing data to our system.
                  </p>
                </div>
                <div class="feature-card">
                  <div class="flex items-center mb-4">
                    <BanknotesIcon class="h-8 w-8 text-blue-500 mr-3"/>
                    <h3 class="text-xl font-bold">Accounts</h3>
                  </div>
                  <p class="text-gray-700">
                    Manage multiple school accounts in one place.
                  </p>
                </div>
                <div class="feature-card">
                  <div class="flex items-center mb-4">
                    <BriefcaseIcon class="h-8 w-8 text-blue-500 mr-3"/>
                    <h3 class="text-xl font-bold">Messages</h3>
                  </div>
                  <p class="text-gray-700">
                    Send fee balance notifications via SMS to parents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer id="footer" class="text-black py-8 bg-blue-300">
      <div class="container mx-auto px-4 text-center">
        <p>SAMIS &copy;{{ new Date().getFullYear() }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import {
  PlusCircleIcon,
  BanknotesIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CurrencyBangladeshiIcon,
  MapIcon
} from "@heroicons/vue/24/outline";

const isAtTop = ref(true);

const checkScrollPosition = () => {
  isAtTop.value = window.scrollY <= 10;
};

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: sectionId === 'home' ? 0 : section.offsetTop - 80,
      behavior: "smooth"
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", checkScrollPosition);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScrollPosition);
});
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

#home {
  padding-top: 0;
  margin-top: 0;
  height: 600px;
}

.my-button {
  background-color: white;
  color: blue;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.my-button:hover {
  background-color: blue;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feature-card {
  @apply bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1;
}

.min-h-screen {
  min-height: 100vh;
}
</style>