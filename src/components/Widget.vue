<template>
    <div class="card">

        <div class="card-body">

            <div class="d-flex">
                <p class="ml-auto d-flex flex-column text-right">
                    <span :class="'text-'+textColor">
                        <i :class="'fas fa-arrow-'+arrowDir"/> {{percentage}}%
                    </span>
                    <span class="text-muted">Since last week</span>
                </p>
            </div>

            <div class="position-relative mb-4">
                <canvas id="visitors-chart" height="200"/>
            </div>

            <div class="d-flex flex-row justify-content-start" style="padding-right: 4vw">
              <span class="mr-2">
                <i class="fas fa-square sqr" style="color: orange" /> Visits this week
              </span>
              <span class="mr-2">
                <i class="fas fa-square sqr" style="color: red" /> Uniques this week
              </span>
              <span class="mr-2">
                <i class="fas fa-square sqr" style="color: blue" /> Visits last week
              </span>
              <span class="mr-2">
                <i class="fas fa-square sqr" style="color: rgba(0, 168, 0, 1)" /> Uniques last week
              </span>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'widget-1',
    data() {
      return {
        arrowDir: "up",
        textColor: "success",
        percentage: 0
      }
    },
    mounted() {
      this.getChart()
    },
    methods: {
      getChart() {
        axios({
          method: "GET",
          url: this.$route.params.proxy +"/server/getVisitors"
        })
          .then(res => {
            if (res.data.success)
              this.initChart(res.data)
          })
      },
      initChart(data) {

        this.percentage = data.percentage

        if (this.percentage < 0) {
          this.percentage = Math.abs(this.percentage)
          this.arrowDir = "down"
          this.textColor = "warning"
        } else if (isNaN(this.percentage)) {
          this.percentage = "N/A"
          this.arrowDir = ""
        }
        
        new Chart(document.getElementById("visitors-chart"), {
          type: 'line',
          data: {
            labels: ['0', '1', '2', '3', '4', '5', '6'],
            datasets: [
              {
                backgroundColor: 'rgba(255, 168, 0, 0.1)',
                borderColor: 'rgba(255, 168, 0, 1)',
                fill: false,
                data: data.thisWeek,
                lineTension: 0
              },
              {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                fill: false,
                data: data.thisWeekUnique,
                lineTension: 0
              },
              {
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                fill: false,
                data: data.lastWeek,
                lineTension: 0
              },
              {
                backgroundColor: 'rgba(0, 168, 0, 0.1)',
                borderColor: 'rgba(0, 168, 0, 1)',
                fill: false,
                data: data.lastWeekUnique,
                lineTension: 0
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Day"
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Visitors"
                }
              }]
            }
          }
        })
      }
    }
}
</script>

<style scoped>
  .card {
    max-width: 50vw;
    max-height: 80vh;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px black;
    background-color: darkgray;
  }

    .mr-2 {
        padding-right: 10px;
    }

    .sqr {
      box-shadow: 0 0 2px 2px rgb(0, 0, 0) inset
    }

    @media(max-width: 700px) {
        .card {
            max-width: 80vw;
        }
    }
    @media(max-width: 400) {
      .card {
        max-width: 90vw;
      }
    }
</style>
