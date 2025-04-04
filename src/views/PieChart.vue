<template>
    <Pie
      id="my-pie-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { Pie } from "vue-chartjs"; 
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement, 
    CategoryScale,
    LinearScale,
    type ChartOptions, 
  } from "chart.js";
  
 
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement, 
    CategoryScale,
    LinearScale
  );
  

  const chartData = ref({
    labels: ["Budget", "Balances", "Bal BF","RECEIPTS"], 
    datasets: [
      {
        label: "Financial Distribution", 
        data: [400000, 200000, 120000,100000], 
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

  const chartOptions = ref<ChartOptions<"pie">>({
    responsive: true,
    maintainAspectRatio: true,
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