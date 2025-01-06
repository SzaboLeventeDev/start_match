<script setup lang="ts">
import type { Currency } from '@/interfaces/currency';
import { useMasterDataStore } from '@/stores/masterData/useMasterDataStore';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import inputValidationRules from '@/helpers/inputValidationRules';

const masterDataStore = useMasterDataStore();
const { currencies, currencyToSave } = storeToRefs(masterDataStore.currencyStore!)
const { updateCurrency, addCurrency, saveNewCurrency, cancelNewCurrency } = masterDataStore.currencyStore!

const saveCurrencyHandler = (currency: Currency) => {
  currency.currencyId === undefined ? saveNewCurrency() : updateCurrency(currency);
}

</script>
<template>
  <router-view />
  <v-container class="currenciesHeader">
    <h1>Currencies</h1>
    <v-btn class="addCurrencyBtn" rounded="xl" @click="addCurrency">+</v-btn>
  </v-container>
  <v-card v-if="currencyToSave" class="newCurrencyCard">
    <v-text-field label="Currency name" v-model="currencyToSave.name" :rules="[inputValidationRules.currencyName]"/>
    <v-text-field label="Currency code" v-model="currencyToSave.code" :rules="[inputValidationRules.currencyCode]"/>
    <v-container class="buttonWrapper">
      <base-button @click="saveNewCurrency">save</base-button>
      <base-button @click="cancelNewCurrency">cancel</base-button>
    </v-container>
  </v-card>
  <v-container class="currencyListWrapper">
    <base-card v-for="currency in currencies" :title="`${currency.name}`" :key="currency.currencyId" 
    :isEditable="true" :saveModification="() => saveCurrencyHandler(currency)">
      <template #content>
        <v-label>{{ currency.code }}</v-label>
      </template>
      <template #editContent>
        <v-container>
          <v-text-field label="Currency name" v-model="currency.name" :rules="[inputValidationRules.currencyName]"/>
          <v-text-field label="Currency code" v-model="currency.code" :rules="[inputValidationRules.currencyCode]"/>
        </v-container>
      </template>
    </base-card>
  </v-container>
</template>
<style scoped lang="css">
.currenciesHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: var(--c-orange);
}
.addCurrencyBtn {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--c-orange);
  background-color: var(--c-blue);
  color: var(--c-white);
}

.newCurrencyCard{
  width: 70vw;
  margin: auto;
  border: 1px solid var(--c-orange);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  padding: .5rem;
  @media(min-width: 768px) {
    gap: 1rem;
    flex-direction: row;
    align-items: center;
  }
}
.currencyListWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.v-card {
  @media (min-width: 768px) {
    width: unset;
  }
}

.buttonWrapper {
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  gap: 1rem;
  }
</style>