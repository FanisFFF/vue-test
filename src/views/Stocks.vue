<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

const page = ref(1);
const limit = ref(20);

const resData = ref([]);
async function fetchData() {
  try {
    const res = await axios.get(`http://${import.meta.env.VITE_APP_API_HOST}:${import.meta.env.VITE_APP_API_PORT}/api/stocks`, {
      params: {
        key: import.meta.env.VITE_APP_API_KEY,
        page: page.value,
        limit: limit.value,
        dateFrom:new Date().toISOString().split('T')[0]

      }
    });
    resData.value = res.data.data;
    console.log(resData.value);
  } catch (error) {
    console.log(error);
  }
}



onMounted(() => {
  fetchData();
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const dates = resData.value?.map(el=>el.date);
const data = computed(() => ({
  labels: resData.value.map(el => el.date),
  datasets: [
    {
      label: 'Price',
      backgroundColor: '#f87979',
      data: resData.value.map(el => el.price)
    }
  ]
}));
const options = {
  responsive: true,
  maintainAspectRatio: false
}
watch( limit, fetchData, { deep: true });

</script>

<template>
  <h2 style="margin-bottom: 1rem;">Stocks</h2>
  <div >
    <label style="display: block;" for="limit">Limit to:</label>
    <input v-model="limit" name="limit" style="margin-bottom: 1rem;"  type="number" placeholder="limit to">
  </div>
  <div style="margin-bottom: 1rem;">
    <Line :data="data" :options="options" />
  </div>
  <div >
    <v-data-table :items="resData"></v-data-table>
  </div>

</template>
