<template>
    <div class="card">

        <div class="card-body">

            <div class="d-flex">
                <p class="ml-auto d-flex flex-column text-right">
                    <span :class="'text-'+textColor">
                        <i :class="'fas fa-arrow-'+arrowDir"/> {{percentage}}%
                    </span>
                    <span class="text-muted">Last week</span>
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
      setByDays(data, factor) {
        let weekDays = [0, 0, 0, 0, 0, 0, 0]
        data.forEach(element => {
          const day = ((Date.now() - element) / 1000 / 60 / 60 / 24) - factor
          if (day <= 1)
            weekDays[0]++
          else if (day > 1 && day <= 2)
            weekDays[1]++
          else if (day > 2 && day <= 3)
            weekDays[2]++
          else if (day > 3 && day <= 4)
            weekDays[3]++
          else if (day > 4 && day <= 5)
            weekDays[4]++
          else if (day > 5 && day <= 6)
            weekDays[5]++
          else if (day > 6 && day <= 7)
            weekDays[6]++
        })
        
        for (let i = weekDays.length - 1; i > 1; i--) {
          if (weekDays[i] == 0)
            weekDays[i] = null
          else
            break
        }
        return weekDays
      },
      initChart(data) {
        const thisWeek = this.setByDays(data.thisWeek, 0)
        const thisWeekUnique = this.setByDays(data.thisWeekUnique, 0)
        const lastWeek = this.setByDays(data.lastWeek, 7)
        const lastWeekUnique = this.setByDays(data.lastWeekUnique, 7)
        this.percentage = Math.trunc(thisWeek[0] / lastWeek[0] * 100)

        if (this.percentage < 0) {
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
                data: thisWeek,
                lineTension: 0
              },
              {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgba(255, 0, 0, 1)',
                fill: false,
                data: thisWeekUnique,
                lineTension: 0
              },
              {
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderColor: 'rgba(0, 0, 255, 1)',
                fill: false,
                data: lastWeek,
                lineTension: 0
              },
              {
                backgroundColor: 'rgba(0, 168, 0, 0.1)',
                borderColor: 'rgba(0, 168, 0, 1)',
                fill: false,
                data: lastWeekUnique,
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
