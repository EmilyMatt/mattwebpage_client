<template>
    <div class="weather">

        <h1 class="header">Weather</h1>
        <h3 class="subheader">Click on any city to view current temperatures</h3>
        <p id="weatherError" class="site-error" v-show="err_axios"><b>Unable to retrieve data</b></p>
        <loading-img v-if="!axios_done"></loading-img>
        
        <div id="map"/>
        <div id="modal" :class="modal.class" :style="modal.style">
            <span class="close" @click="modal.class=''">&times;</span>
            <div id="cityName"><b style="color: darkgreen; left: -10px; position: relative;">{{modal.city_name}}</b></div>
            <div>Temperature:</div>
            <span id="temps"><b>{{modal.temperature_min}}</b> - <b>{{modal.temperature_max}}</b></span>
            <div id="wCode"><b style="color: orange;">{{modal.weather_name}}</b></div>
        </div>

    </div>
</template>

<script>
    import json from '../assets/json/markers.json'
  import viewsFunctions from '../controllers/views'
  import Loading from '../components/Loading'

export default {
    name: 'weather',
    props: ["pagesList"],
    //"global" variables for component
    data() {
      return {
        axios_done: false,
            err_axios: false,
            map: null,
            map_key: "",
            markers: [],
            weatherData: [],
            map_size: { width: "400px", height: "600px" },
            modal: {
                class: "",
                city_name: "",
                style: "",
                temperature_min: "",
                temperature_max: "",
                weather_name: "",
                reformX: "- 17vw"
            },
        }
    },
    mounted() {
        //add event listener for screen resizes
        window.addEventListener('resize', this.screenResize)
        
        //update sidebar buttons
        viewsFunctions.updateButtons(this.pagesList, this.$options.name)

        //get weather data from server and save it to component variable
        axios({
          method: "GET",
          url: this.$route.params.proxy+"/server/weather/getForecast"
        })
            .then( response => {

              this.axios_done = true;
                //if request failed show error
                if (!response.data.success)
                    return this.err_axios = true

                //if request succeeded, set map key, weather data, and initiate map
                this.err_axios = false
                this.weatherData = response.data.forecast.data
                this.map_key = response.data.key
                this.initMap()    
            })
          .catch(() => {

              this.axios_done = true;
                //handle error if no data exists
                this.err_axios = true
            })

    },
    methods: {
        initMap() {

            const data = this.weatherData

            //set up map with weather style
            mapboxgl.accessToken = this.map_key
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/emilymatt/ckfb9dreg42zg19npr9gout0p',
                center: [34.9, 31.4],
                interactive: false,
                zoom: 6.5
            })

            //set map size
            this.resizeMap("600px", "400px")

            //for every city in json
            json.markers.forEach( (element, idx) => {
                
                const idxData = this.extractData(data[element.id])
                
                //create new div with city id
                const div = document.createElement('div')
                div.setAttribute('id', element.id)
                
              //add click listener to open info modal
              div.addEventListener("click", (event) => this.modalInfo(event.pageX, event.pageY, idxData))
                
                //set style and specific image
                div.classList.add('marker')
                div.style.backgroundImage = `url(${idxData.icon})`   
                
                //create marker at city coordinates and bind div to it
                this.markers[idx] = new mapboxgl.Marker(div)
                    .setLngLat([element.lng, element.lat])
                    .addTo(this.map)

                //create label for every marker
                const label =  document.createElement('p')
                label.setAttribute('id', "label-"+element.id)
                label.textContent = 
                //element.id
                idxData.name
                label.classList.add('marker-label')

                //set marker specific positions
                const topleft = element.position
                if (topleft) {
                    label.style = `top: ${topleft.top};left: ${topleft.left};`
                }

                //set label as child of marker
                div.appendChild(label)
            })
        },
        extractData(data) {

            //on evening we only get partial data, so make sure data is full, or switch to next forecast
            const idx = data.forecasts[0].hasOwnProperty("wCode") ? 0 : 1
            
            const wCode = data.forecasts[idx].wCode
            
            //return the data for the specific city
            return { 
                wCode,
                temp: [data.forecasts[idx].minTemp, data.forecasts[idx].maxTemp],
                name: data.cityNameEng,
              icon: `${this.$route.params.proxy}/img/forecast/${wCode.toString()}.png` //path for weather icons + specific weather code + extension
            }
        },
        modalInfo(pageX, pageY, data) {

            //on click, make modal disappear from current location
            this.modal.class = ""

            //update modal information with relevant city
            this.modal.city_name = data.name,
            this.modal.temperature_min = data.temp[0]+"°"
            this.modal.temperature_max = data.temp[1]+"°"
            this.modal.weather_name = json.wCodes[data.wCode]

            //after 0.5s, to allow for animation, make the modal visible at the new location
            setTimeout( () => {
                this.modal.class = "shown"
                this.modal.style = `left: ${pageX}px; top: ${pageY}px;`
                }, 500)
        },
        screenResize() {

            //firstly hide modal
            this.modal.class = ""
            const screenWidth = screen.width

            //set refactor value depending on the screen size
            this.modal.reformX = viewsFunctions.reformX(screenWidth)       
        },
        resizeMap(height, width) {

            document.getElementById("map").style.height = height
            document.getElementById("map").style.width = width
            this.map.resize()
        }
    },
    components: {
      'loading-img': Loading
    }
}
</script>

<style>

  .weather {
      max-height: 90vh;
      overflow-y: auto;
  }
    #map {
        border-radius: 10%;
        box-shadow: 0 0 5px 5px black;
        margin-left: 5vw;
    }

    .marker {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }

    .marker-label {
        position: relative;
        top: 50px;
        width: 80px;
        font-weight: bolder;
        color: black;
        text-align: center;
    }

    #modal {
        display: block;
        opacity: 0;
        width: 0;
        height: 0;
        position: fixed;
        background-color: gray;
        box-shadow: 0 0 10px 5px black;
        border-radius: 10%;
        padding: 5px;
        overflow: hidden;
        text-align: center;
        transition: 0.25s ease;
        margin: 0;
    }

    #modal.shown {
        opacity: 1; 
        width: 160px; 
        height:140px;
    }

    #modal div, #modal span {
        color: black;
    }
    #modal .close {
        float: left;
        cursor: pointer;
    }

    #temps {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #map {
        position: relative;
        transition: 0.5s;
    }

    @media(max-width: 480px) {
        
        #map {
            left: 0vw;
        }
    }
</style>
