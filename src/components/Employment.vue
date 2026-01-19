<template>
  <section class="section">
    <h2 class="section-title">Employment</h2>

    <div v-for="(item, index) in data" :key="index" class="timeline-item">
      <div class="timeline-year">{{ item.year }}</div>
      <div class="timeline-content">
        <h3>{{ item.position }}</h3>
        <p v-for="(detail, idx) in item.details" :key="idx">{{ detail }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
