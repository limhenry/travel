<template>
  <div class="transit border-2 border-gray-600 dark:border-gray-400">
    <PlaneIcon class="text-black dark:text-white" />
    <div class="box" />
  </div>
</template>

<style>
:root {
  --transit-marker-bg-color: #fff;
}

html.dark {
  --transit-marker-bg-color: #1f2937;
}
</style>

<style scoped>
.transit {
  position: absolute;
  right: 8px;
  height: 32px;
  padding-top: 4px;
  border-bottom: none;
  top: -2px;
  background-color: var(--transit-marker-bg-color);
}

.box {
  @apply border-2 border-gray-600 dark:border-gray-400;

  position: absolute;
  width: 20px;
  height: 20px;
  top: 34px;
  left: 2px;
  transform: rotate(45deg);
  z-index: 1;
  border-right: none;
  border-bottom: none;
}

.transit::before,
.transit::after {
  @apply border-2 border-gray-600 dark:border-gray-400;

  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  top: 30px;
  border-top: none;
  border-bottom: none;
}

.transit::before {
  left: -2px;
  background: linear-gradient(to top left, #fff0 0%, #fff0 50%, var(--transit-marker-bg-color) 50%, var(--transit-marker-bg-color) 100%);
  border-right: none;
}

.transit::after {
  right: -2px;
  background: linear-gradient(to top right, #fff0 0%, #fff0 50%, var(--transit-marker-bg-color) 50%, var(--transit-marker-bg-color) 100%);
  border-left: none;
}
</style>
