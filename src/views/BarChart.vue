<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { Bar } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartOptions,
  } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const chartData = ref({
    labels: ["SchoolFund", "Tuition", "Operation"],
    datasets: [
      {
        label: "Accounts overview",
        data: [400000, 200000, 120000],
        backgroundColor: [
          "#36A2EB",
          "#FF6384", 
          "#FFCE56",
          "#62f142",
        ],
        hoverOffset: 4,
      },
    ],
  });
  
  const chartOptions = ref<ChartOptions<"bar">>({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  });
  </script>