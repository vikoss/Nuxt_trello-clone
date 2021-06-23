<template>
  <div class="absolute right-1 top-16 bg-white text-black shadow-2xl rounded px-2 w-96">
    <section class="border-b py-2">
      <view-list-icon size="2x" class="inline-block opacity-70" />
      <h3 class="inline-block">
        Actividad
      </h3>
      <x-icon size="2x" class="cursor-pointer float-right opacity-70 hover:opacity-50" @click="$emit('close')" />
    </section>
    <section v-if="!!activities.length" class="overflow-x-auto py-2" style="max-height: calc(100vh - 200px)">
      <div v-for="activity in activities" :key="activity.id" class="my-2">
        <p class="text-sm font-medium">
          {{ activity.text }}
        </p>
        <p class="opacity-40 text-xs">
          {{ activity.updatedAt | timestampToDateString }}
        </p>
      </div>
    </section>
    <section v-else class="my-2">
      <p class="text-sm font-medium">
        Ninguna actividad en el tablero.
      </p>
    </section>
  </div>
</template>

<script>
import { ViewListIcon, XIcon } from '@vue-hero-icons/outline'
import { timestampToDateString } from '~/filters/date'

export default {
  components: { ViewListIcon, XIcon },
  filters: { timestampToDateString },
  props: {
    activities: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style>

</style>
