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
const filters = ref({ dateFrom: '2025-04-03', dateTo: '2025-05-05' });
const resData = ref([]);
async function fetchData() {
  try {
    const res = await axios.get(`http://${import.meta.env.VITE_APP_API_HOST}:${import.meta.env.VITE_APP_API_PORT}/api/orders`, {
      params: {
        key: import.meta.env.VITE_APP_API_KEY,
        page: page.value,
        limit: limit.value,
        ...filters.value
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
const dates = resData.value?.map(el => el.date);
const data = computed(() => ({
  labels: resData.value.map(el => el.date),
  datasets: [
    {
      label: 'Total price',
      backgroundColor: '#f87979',
      data: resData.value.map(el => el.total_price)
    }
  ]
}));
const options = {
  responsive: true,
  maintainAspectRatio: false
}
watch([filters, limit], fetchData, { deep: true });

</script>

<template>
  <h2 style="margin-bottom: 1rem;">Orders</h2>
  <div >
    <label style="display: block;" for="limit">Limit to:</label>
    <input v-model="limit" name="limit" style="margin-bottom: 1rem;"  type="number" placeholder="limit to">
  </div>
  <div class="flex gap-4 items-center mb-4">
    <div>
      <label for="dateFrom">Date from:</label>
      <input name="dateFrom" type="date" v-model="filters.dateFrom" />
    </div>
    <div>
      <label for="dateTo">Date to:</label>
      <input name="dateTo" type="date" v-model="filters.dateTo" />
    </div>
  </div>
  <div style="margin-bottom: 1rem;">
    <Line :data="data" :options="options" />
  </div>
    <v-data-table :items="resData"></v-data-table>

</template>