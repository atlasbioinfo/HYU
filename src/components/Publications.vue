<template>
  <div class="publications-component">
    <h2 class="section-title">
      {{ lang === 'en' ? 'Publications' : '学术出版物' }}
    </h2>

    <!-- Filter Controls -->
    <div class="filter-controls">
      <div class="filter-group">
        <label class="filter-label">
          {{ lang === 'en' ? 'Filter by Year:' : '按年份筛选：' }}
        </label>
        <div class="year-tags">
          <button
            :class="['year-tag', { active: selectedYear === null }]"
            @click="selectedYear = null"
          >
            {{ lang === 'en' ? 'All' : '全部' }} ({{ data.length }})
          </button>
          <button
            v-for="year in availableYears"
            :key="year"
            :class="['year-tag', { active: selectedYear === year }]"
            @click="selectedYear = year"
          >
            {{ year }} ({{ getYearCount(year) }})
          </button>
        </div>
      </div>
    </div>

    <!-- Publications by Year -->
    <div class="publications-by-year">
      <div
        v-for="year in displayYears"
        :key="year"
        class="year-section"
      >
        <div class="year-header">
          <h3 class="year-title">{{ year }}</h3>
          <span class="year-count">{{ getYearPublications(year).length }} {{ lang === 'en' ? 'publications' : '篇' }}</span>
        </div>
        <div class="publications-list">
          <div
            v-for="(pub, index) in getYearPublications(year)"
            :key="index"
            class="publication-item"
          >
            <div class="pub-content">
              <h4 class="pub-title">{{ pub.title }}</h4>
              <p class="pub-authors">{{ pub.authors }}</p>
              <p class="pub-journal">
                <strong>{{ pub.journal }}</strong>
                <span v-if="pub.volume"> · {{ pub.volume }}</span>
              </p>
              <div class="pub-footer">
                <a v-if="pub.doi" :href="pub.doi" target="_blank" class="pub-doi-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  DOI: {{ pub.doi.replace('https://doi.org/', '') }}
                </a>
                <span v-if="pub.note" class="pub-note">{{ pub.note }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  lang: {
    type: String,
    default: 'en'
  }
})

const selectedYear = ref(null)

// Get unique years and sort them in descending order
const availableYears = computed(() => {
  const years = [...new Set(props.data.map(pub => pub.year))]
  return years.sort((a, b) => b - a)
})

// Get years to display based on filter
const displayYears = computed(() => {
  if (selectedYear.value === null) {
    return availableYears.value
  }
  return [selectedYear.value]
})

// Get publications for a specific year
const getYearPublications = (year) => {
  return props.data.filter(pub => pub.year === year)
}

// Get count of publications for a year
const getYearCount = (year) => {
  return getYearPublications(year).length
}
</script>

<style scoped>
.publications-component {
  width: 100%;
}

.section-title {
  font-family: 'Crimson Text', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid var(--accent-primary);
}

/* Filter Controls */
.filter-controls {
  margin-bottom: 32px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.year-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.year-tag {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1.5px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.year-tag:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--bg-secondary);
  transform: translateY(-2px);
}

.year-tag.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
}

/* Publications by Year */
.publications-by-year {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.year-section {
  animation: fadeInUp 0.5s ease;
}

.year-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color);
}

.year-title {
  font-family: 'Crimson Text', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-primary);
  margin: 0;
}

.year-count {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

/* Publications List */
.publications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.publication-item {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border-left: 4px solid var(--accent-primary);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.publication-item:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
  border-left-width: 6px;
}

.pub-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pub-title {
  font-family: 'Crimson Text', serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.5;
}

.pub-authors {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.pub-journal {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 4px 0;
}

.pub-journal strong {
  color: var(--text-primary);
  font-weight: 600;
}

.pub-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.pub-doi-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.pub-doi-link:hover {
  color: var(--accent-secondary);
  transform: translateX(4px);
}

.pub-doi-link svg {
  flex-shrink: 0;
}

.pub-note {
  display: inline-block;
  font-size: 12px;
  color: var(--accent-tertiary);
  font-weight: 600;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-title {
    font-size: 26px;
  }

  .year-title {
    font-size: 24px;
  }

  .filter-controls {
    padding: 16px;
  }

  .year-tags {
    gap: 6px;
  }

  .year-tag {
    padding: 5px 12px;
    font-size: 12px;
  }

  .publication-item {
    padding: 16px;
  }

  .pub-title {
    font-size: 16px;
  }

  .pub-authors,
  .pub-journal {
    font-size: 13px;
  }
}
</style>
