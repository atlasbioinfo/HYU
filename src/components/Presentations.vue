<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Selected Presentations' : '主要学术报告' }}</h2>

    <div class="presentations-timeline">
      <div v-for="(item, index) in data" :key="index" class="timeline-item">
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div v-if="index < data.length - 1" class="marker-line"></div>
        </div>
        <div class="timeline-content-card">
          <div class="timeline-header">
            <span class="pres-year">{{ item.year }}</span>
            <span class="pres-type" :class="item.type.toLowerCase()">{{ item.type }}</span>
          </div>
          <p class="pres-title">{{ item.title[lang] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  lang: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.section-title {
  font-family: 'Crimson Text', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary, #1a202c);
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid #2563eb;
}

.presentations-timeline {
  position: relative;
  padding: 24px 0;
}

.timeline-item {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2563eb;
  border: 4px solid var(--bg-primary, #ffffff);
  box-shadow: 0 0 0 2px #2563eb, 0 2px 8px rgba(37, 99, 235, 0.3);
  z-index: 2;
  transition: all 0.3s;
}

.timeline-item:hover .marker-dot {
  transform: scale(1.3);
  box-shadow: 0 0 0 3px #2563eb, 0 4px 12px rgba(37, 99, 235, 0.5);
}

.marker-line {
  width: 3px;
  flex: 1;
  min-height: 60px;
  background: linear-gradient(to bottom, #2563eb, #3b82f6);
  margin-top: -4px;
}

.timeline-content-card {
  flex: 1;
  background: var(--bg-primary, #ffffff);
  border: 2px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 20px 24px;
  transition: all 0.3s;
  cursor: default;
}

.timeline-content-card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
  transform: translateX(4px);
}

.timeline-header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.pres-year {
  font-size: 16px;
  font-weight: 700;
  color: #2563eb;
  padding: 4px 12px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 6px;
}

.pres-type {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pres-type.oral,
.pres-type.invited {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.pres-type.poster {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.pres-title {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-primary, #1a202c);
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .timeline-item {
    gap: 16px;
  }

  .timeline-content-card {
    padding: 16px 18px;
  }

  .section-title {
    font-size: 26px;
  }
}
</style>
