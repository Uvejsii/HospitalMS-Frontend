<script setup>
import router from "../router/index.js";
import {useRoute} from "vue-router";
import {ref} from "vue";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';

const route = useRoute()

const items = ref([
  { route: '/admin/doctorsDashboard', label: 'Doctors', icon: 'bi bi-person' },
  { route: '/admin/departmentsDashboard', label: 'Departments', icon: 'bi bi-hospital' },
]);
</script>

<template>
  <Tabs :value="route.path">
    <TabList>
      <Tab v-for="tab in items" :key="tab.label" :value="tab.route" @click="tab.route ? router.push(tab.route) : null">
        <RouterLink v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
          <a v-ripple :href="href" @click="navigate" class="d-flex align-items-center gap-1
           w-100 text-black text-decoration-none text-reset">
            <i :class="tab.icon" />
            <span>{{ tab.label }}</span>
          </a>
        </RouterLink>
      </Tab>
    </TabList>
  </Tabs>
</template>

<style scoped>

</style>