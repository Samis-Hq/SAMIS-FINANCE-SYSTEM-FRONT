<template>
  <div class="min-h-screen flex flex-col font-serif">
    <!-- Header -->
    <header
      ref="header"
      class="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 z-50 transition-transform duration-300"
      :class="{ '-translate-y-full': !isHeaderVisible }"
    >
      <div class="container mx-auto flex justify-around items-center">
        <!-- Logo -->
        <div class="text-3xl font-custom tracking-[.25em]">SAMIS FINANCE</div>

        <!-- Links -->
        <nav class="flex gap-4">
          <button @click="scrollToSection('home')" class="text-xl uppercase hover:text-blue-300">
            Home
          </button>
          <button @click="scrollToSection('about')" class="text-xl uppercase hover:text-blue-300">
            About
          </button>
          <!-- <router-link to="/dash" class="text-2xl uppercase bg-white text-blue-500 rounded-sm px-4 hover:text-white hover:bg-blue-500">
            Login
          </router-link> -->
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <!-- Home Section -->
      <section
        id="home"
        class="header-section relative flex items-center justify-start text-white"
      >
        <!-- Background Image -->
        <div
          class="absolute inset-0 bg-[url('../assets/niger.jpg')] bg-cover bg-center"
        ></div>

        <!-- Blur Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent backdrop-blur-sm"
        ></div>

        <!-- Content -->
        <div class="relative z-10 text-left  mt-10 font-serif pl-32 pt-32">
          <h1 class="text-4xl font-bold mb-4 text-white">SAMIS FINANCE SYSTEM</h1>
          <p class="text-xl">Manage financial activities easily.</p>

          <div class="mt-10">
            <router-link to="/dash" class="my-button">LOGIN HERE</router-link>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-8">About Us</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-4">Our Mission</h3>
              <p class="text-gray-700">
                We aim to provide the best services to our customers.
              </p>
            </div>

            <!-- Card 2 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-4">Our Vision</h3>
              <p class="text-gray-700">
                To be a global leader in innovation and customer satisfaction.
              </p>
            </div>

            <!-- Card 3 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-4">Our Values</h3>
              <p class="text-gray-700">
                Integrity, Excellence, and Customer Focus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer id="footer" class="bg-white text-black py-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 My Website. All rights reserved.</p>
        <p class="mt-2">Contact: info@mywebsite.com</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const header = ref<HTMLElement | null>(null);
const isHeaderVisible = ref(true);
let lastScrollPosition = 0;


const handleScroll = () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
 
    isHeaderVisible.value = false;
  } else {
  
    isHeaderVisible.value = true;
  }

  lastScrollPosition = currentScrollPosition;
};


const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.header-section {
  height: 600px; 
  margin-top: 60px; 
}

.bg-gradient-to-r {
  backdrop-filter: blur(1px); 
}

.my-button {
  background-color: white;
  color: blue;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.my-button:hover {
  background-color: blue;
  color: white;
}

.min-h-screen {
  min-height: 100vh; 
}

.flex-grow {
  flex-grow: 1; 
}
</style>