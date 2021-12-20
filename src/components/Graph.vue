<template>
  <div>
    <highcharts
      :options="chartOptions"
      ref="lineCharts"
    ></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";
import { reactive, computed } from 'vue';

stockInit(Highcharts);
exportingInit(Highcharts);

export default {
  name: "GraphMain",
  props: {
    partsdata: {
      type: Array
    },
    dataset: {
      type: Object
    }
  },
  components: {
    highcharts: Chart
  },

// Due to Highchart synthax, we are not using <script setup> for this component
// eslint-disable-next-line
  setup(props){ 
    // Create Dataset
    const data = reactive(props.dataset);
    // For the labels, need to order, sanitize and verify the labels. 
    // As well the option to index value & label for more safety
    const labelGraph = reactive([1,2,3]);
    const dataGraph = computed({ // eslint-disable-next-line
      get: () => data.map(({ orders, realStock, id, timestamp, ...item }) => item.expectedStock),
      set: val => {
        data.value = val
      }
    })

    // ChartOptions
    const chartOptions = reactive({
      chart: {
        type: "spline",
        title: "Flowlity test"
      },
      title: {
        text: 'Stock evolution'
      },
      subtitle: {
          text: 'Follow the evolution of the stocks in your warehouse'
      },
      xAxis: {
        categories: labelGraph.value
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: "#2c3e50",
            lineWidth: 1
          }
        }
      },
      series: [
        {
          data: computed({
            get: () => dataGraph.value,
            set: val => {
              dataGraph.value = val
            }
          })
        }
      ]
    })

    return {
      chartOptions,
      dataGraph,
      data
    }
  }
};
</script>