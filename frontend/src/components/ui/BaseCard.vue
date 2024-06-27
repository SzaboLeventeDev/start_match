<script setup lang="ts">
import {ref, computed } from 'vue';
import { CardState } from '@/enums/cardState';

const props = defineProps<{
  title: string,
  isEditable: boolean,
  saveModification: Function
}>()

/** refs */
const cardState = ref<CardState>(CardState.Read)
const cardModifierIcon = computed(() =>
  cardState.value === CardState.Edit ? 'mdi-floppy' : 'mdi-pencil'
)

const modifyCardState = async () => {
  if (cardState.value === CardState.Edit) {
    const {saveModification } = props

    await saveModification()
    cardState.value = CardState.Read;
    return;
  }
  cardState.value = CardState.Edit;
}
</script>
<template>
  <v-card :title="props.title" variant="tonal" :class="{ 'edit-mode': cardState === CardState.Edit }">
    <div v-if="props.isEditable" class="cardIconWrapper" @click="modifyCardState">
      <v-icon :icon="cardModifierIcon" class="cardModifierIcon"></v-icon>
    </div>
    <transition name="fade" tag="div">
      <slot v-if="cardState === CardState.Read" name="content" key="content"></slot>
    </transition>
    <transition name="fade">

      <slot v-if="isEditable && cardState === CardState.Edit" name="editContent" key="editContent"></slot>
    </transition>
    <slot name="actions" class="actions"></slot>
    <slot v-if="isEditable && cardState === CardState.Edit" name="editActions" class="actions"></slot>
  </v-card>
</template>
<style scoped>
.v-card {
  position: relative;
  width: 70vw;
  height: auto;
  padding: 1.5rem;
  border-radius: 1rem;
  overflow: visible;
  background-color: var(--c-light-blue);
  border: 1px solid var(--c-orange);
  color: var(--c-white);
  transition: height 0.5s ease-in-out, opacity 0.5s ease;
  min-height: 150px;
}

.cardIconWrapper {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  z-index: 2;
  background-color: white;
  border: 2px solid var(--c-orange);
  border-radius: 50%;
  padding: 0.4rem;
  background-color: var(--c-light-blue);
  transition: transform 0.5s ease, width 0.5s ease, height 0.5s ease;
}
.cardIconWrapper:hover {
 transform: scale(1.2);
 width: auto;
 height: auto;
}

.cardModifierIcon {
  font-size: 1.3rem;
  transition: font-size 0.3s ease;
}

.edit-mode {
  height: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, height 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
