<template>
  <div class="table mb-0">
    <div class="B">
      <slot></slot>
    </div>
    <div class="array-rendering overflow-x-scroll pb-3">
      <!-- Parent rows - General Data-->
      <!-- Raw 1 : The dates -->
      <table>
        <tr class="table_bg-dark">
          <th class="text-small">Your stocks</th>
          <div class="table_data">
            <td v-for="item in data" :key="item.id" class="mb-0 text-center table_selector-nest cursor-default" :class="activeData && item.id === activeData[0].id && 'active'" @mouseover="hoverOver(item.id)">
              {{ new Intl.DateTimeFormat('fr-FR').format(new Date(item.timestamp)) }}
            </td>
          </div>
        </tr>

        <!-- Raw 2 : The expected stocks -->
        <tr>
          <th>Expected (Units)</th>
          <div class="table_data">
            <td v-for="(item, index) in data" :key="item.id" @mouseover="hoverOver(item.id)">
              <input v-model="item.expectedStock" :key="index" v-on:input="saveData" type="number" :data-testid="index + 'inputTest'"/>
            </td>
          </div>
        </tr>

        <!-- Raw 3 : The real stocks - Value updated regarding the provider's data -->
        <tr>
          <th>Real (Units)</th>
          <div class="table_data">
            <td v-for="(item, index) in data" :key="item.id" @mouseover="hoverOver(item.id)">
              <input v-model="item.realStock" :key="index" type="number" disabled 
              :style="
                // Check the interval of 20% - to remplace with trust interval
                // The inline style have been choosen in order to dynamise the color palet for a better output
                (item.realStock/item.expectedStock) > 0.8 && (item.realStock/item.expectedStock) <1.2 && (item.expectedStock/item.realStock) < 1.2?
                // Matching stocks are green
                'background-color:rgb(73 170 133 / 50%)'
                // The red intensify proportionally to the difference
                : 'background-color:rgb(233 124 134  / ' + `${
                  item.realStock/item.expectedStock < item.expectedStock/item.realStock 
                    ? (1-item.realStock/item.expectedStock)*100 
                    : (1-item.expectedStock/item.realStock)*100
                  }` + '%)'"/>
              </td>
              
          </div>
        </tr>
      </table>
    </div>

    <!-- Nested rows - Details -->
    <!-- The detailed informations are given for the day highlighted in the main table -->
    <div class="array-rendering table_detail overflow-x-scroll pb-3">
      <table class="w-100">
        <div v-for="(item) in activeData" :key="item.id" :id="item.timestamp" class="table_nested mt-3">
          <!-- Title and button to close the editor -->
          <div class="w-100 d-md-flex pt-md-5 pb-2">
            <h2 class="display-2 my-auto ml-0">Details of the day {{ new Intl.DateTimeFormat('fr-FR').format(new Date(item.timestamp)) }}</h2>
            <Button :onClick="hoverOut" class="btn-tertiary mt-3 mt-md-0 ml-md-5">Close <img src="https://res.cloudinary.com/viviennoel07/image/upload/c_scale,w_50/v1639853594/close-eyes_mfyy32.png" alt="close editor" class="nav_icon"/></Button>
            <Button :onClick="addOrder" class="btn-primary mt-3 mt-md-0 ml-2">Add provider <img src="https://res.cloudinary.com/viviennoel07/image/upload/c_scale,q_67,w_50/v1639943950/add-user_yk1w8l.png" alt="add provider" class="nav_icon"/></Button>
          </div>

          <!-- Desktop -->
          <!-- First row - Provider's name -->
          <div class="d-none d-md-block">
            <tr>
              <th>
                Provider's name
              </th>
              <div class="table_data">
                <td v-for="(item, index) in item.orders" :key="item.id">
                  <input v-model="item.compagny" :key="index" v-on:input="saveData" type="text"/>
                </td>
              </div>
            </tr>
            <!-- Second row - Value by provider -->
            <tr >
              <th>
                By provider (units)
              </th>
              <div class="table_data">
                <td v-for="(item, index) in item.orders" :key="item.id">
                  <input v-model="item.value" :key="index" v-on:input="saveData" type="number"/>
                </td> 
              </div>
            </tr>
          </div>

          <!-- Mobile -->
          <!-- First row - Provider's name mobile -->
          <div class="row mx-0 d-flex d-md-none">
            <div class="col-6 pl-0 pr-1 text-left">
              <p class="mb-0 text-small"><b>Your provider</b></p>
              <form v-for="(item, index) in item.orders" :key="item.id">
                  <input v-model="item.compagny" :key="index" v-on:input="saveData" class="w-100" type="text"/>
              </form>
            </div>
            <div class="col-6 pl-1 pr-0 text-left">
              <p class="mb-0 text-small"><b>Your stock</b></p>
              <form v-for="(item, index) in item.orders" :key="item.id">
                  <input v-model="item.value" :key="index" v-on:input="saveData" class="w-100" type="number"/>
              </form>
            </div>
          </div>

          <div class="w-100 d-md-flex pt-md-3 pt-5 pb-2">
            <h2 class="display-2 my-auto ml-0">Total stock for the day : <span id="table_dayStock">{{ item.realStock }}</span></h2>
          </div>
        </div>
      </table>
    </div>
    <!-- Save the data when needed -->
    <div v-if="updatePending && !readOnly" class="text-left pb-5" @click="hoverOut">
      <Button :onClick="exportData" class="btn-large mt-3" id="save">Save</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  // script setup is a new feature of Vue3 - succinct & better runtime performance
  // More information about this feature : https://v3.vuejs.org/api/sfc-script-setup.html#basic-syntax
  import store from '@/store/index'; // Access store data
  import { reactive, ref, defineProps } from 'vue'; // Manipulate dynamic states
  import Button from '@/components/Button.vue';

  // Define the props 
  const props = defineProps({
    dataset: {
      type: Object, // With more time, need to create model
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    dataName: {
      type: String,
      required: true
    }
  });

  const readOnly = ref(props.readOnly);
  const data = reactive(props.dataset);
  const updatePending = ref(store.state.updatePending ? true : false);
  const activeData = ref();

  // Fonctions used in the component
  // Change status of update to pending and update the realStock
  const saveData = () => {
    if (!readOnly.value) {
      updatePending.value = true
    }
      data.map((dayData:{id:number, realStock:number, expectedStock:number, orders:{value:number, id:number, compagny:string}[]}) => {
        dayData.realStock = 0;
        dayData.orders.map((order:{value:number, id:number, compagny:string}) => dayData.realStock += order.value)
      })
      store.commit('modifyData');
  }

  // Export the data in the Json-Server DB
  const exportData = () => {
    if (props.readOnly === false) {
      store.commit('exportData');
    }
  }

  // Display nested rows
  const hoverOver = (id:number) => {
    activeData.value = [data[id-1]];
  }

  // Hide nested rows
  const hoverOut = () => {
    activeData.value = null;
    console.log(activeData)
  }

  // Add an order to the table 
  const addOrder = () => {
    let currentOrders = activeData.value[0].orders;
    currentOrders[currentOrders.length] = {
        id: currentOrders.length,
        compagny: 'new provider',
        value: 0,
    }
  }
</script>
