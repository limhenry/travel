<script setup lang="ts">
import countries from '~/assets/data/countries.json'
</script>

<template>
  <div class="overflow-hidden relative">
    <ul class="carousel flex gap-4">
      <li
        v-for="(item, key) in countries.toReversed()"
        :key="key"
        class="border border-default rounded-lg p-4 grid text-center gap-2"
      >
        <UIcon
          :name="`flag:${item.id}-4x3`"
          class="size-36"
        />
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.carousel {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  position: relative;

  &::scroll-button(left) {
    content: "⬅" / "Scroll Left";
    left: 4px;
  }

  &::scroll-button(right) {
    content: "⮕" / "Scroll Right";
    right: 4px;
  }

  &::scroll-button(*) {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 40px;
    width: 40px;
    margin: auto;
    border: none;
    border-radius: 50%;
  }

  &::scroll-button(*):focus-visible {
    outline-offset: 5px;
  }

  li {
    scroll-snap-align: start;

    min-width: 176px;
    width: 176px;

    grid-template-rows: 108px auto;

    grid-template-rows: subgrid;
  }
}
</style>
