<template>
    <div id="content" class="meteo">
        <main>
            <h1 class="ville">{{city}}</h1>
            <div v-if="data">
                <p>{{meteoCity.main.temp}} °C</p>
                <p>T. ressentie: {{meteoCity.main.feels_like}} °C</p> 
                <p class="description"> {{meteoCity.weather[0].description}} </p> 
                <img :src="urlIcone" alt="">
                <table>
                    <tr>
                        <td>Vent: {{meteoCity.wind.speed}} km/h</td>
                        <td>Direction: {{windDir}}</td>
                    </tr> 
                    <tr>
                        <td>Levée du soleil: {{meteoCity.sys.sunrise}} EST </td>
                        <td>Couchée du soleil: {{meteoCity.sys.sunset}} EST </td>
                    </tr> 
                </table>
                <p>Fuseau horaire: {{meteoCity.timezone}}</p> 
                <p class="pluie" v-if="rain">Pluie: {{meteoCity.rain["1h"]}} mm dans la dernière heure</p>
                <p class="neige" v-if="snow">Neige: {{meteoCity.snow["1h"]}} mm dans la dernière heure</p>
            </div>
            <button>
                <router-link to="/">Retour</router-link>
            </button>
        </main>
    </div>
</template>

<script>
export default {
    name:"meteoCity",
    data(){
        return {
          city: this.$route.params.city,
          key: "5f7e7da73041e321ee725cb587716867",
          meteoCity: "",
          urlIcone: "",
          windDir: "",
          rain: false,
          snow: false,
          data: false,
        }
    },
    mounted: function() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}&units=metric&lang=fr`

        fetch(url).then( result => {
            return result.json()
        }).then( data => {
            // formattage du fuseau horaire
            if (data.timezone > 0){
                data.timezone = "+" + data.timezone / 3600
            } else {
                data.timezone = data.timezone / 3600
            }
            
            // formattage du lien de l'icone
            this.urlIcone = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

            // formattage de l'heure lever soleil (EST)
            let timestamp_sr = data.sys.sunrise 
            let date_sr = new Date(timestamp_sr * 1000)

            let hours_sr = "0" + date_sr.getHours()
            let minutes_sr = "0" + date_sr.getMinutes()
            let seconds_sr = "0" + date_sr.getSeconds()

            data.sys.sunrise  = hours_sr.substr(-2) + ':' + minutes_sr.substr(-2) + ":" + seconds_sr.substr(-2)

            // formattage de l'heure couchee soleil (EST)
            let timestamp_ss = data.sys.sunset 
            let date_ss = new Date(timestamp_ss * 1000)

            let hours_ss = "0" + date_ss.getHours()
            let minutes_ss = "0" + date_ss.getMinutes()
            let seconds_ss = "0" + date_ss.getSeconds()

            data.sys.sunset  = hours_ss.substr(-2) + ':' + minutes_ss.substr(-2) + ":" + seconds_ss.substr(-2)

            // conversion des degrees du vent en points cardinaux
            let deg = data.wind.deg 

            if (deg < 22.5 || deg > 337.5) {
                this.windDir = "N"
            } else if (deg < 67.5 && deg > 22.5){
                this.windDir = "NE"
            } else if (deg < 112.5 && deg > 67.5){
                this.windDir = "E"
            } else if (deg < 157.5 && deg > 112.5){
                this.windDir = "SE"
            } else if (deg < 202.5 && deg > 157.5){
                this.windDir = "S"
            } else if (deg < 247.5 && deg > 202.5){
                this.windDir = "SW"
            } else if (deg < 292.5 && deg > 247.5){
                this.windDir = "W"
            } else if (deg < 337.5 && deg > 292.5){
                this.windDir = "NW"
            }

            // affichage de la balise sur la pluie seulement si l'information est presente
            if (data.rain) {
                this.rain = true
            }

            // affichage de la balise sur la neige seulement si l'information est presente            
            if (data.snow) {
                this.snow = true
            }

            this.meteoCity = data
            this.data = true
        })
    }
}
</script>

<style scoped>
main {
    margin: 0px auto;
    position: relative;
    top: 50px;
    left: 0px;
    width: 100%;
}

table {
    margin: 0px auto 15px;
    width: 50%;
}

.description {
    text-transform: capitalize;
}
</style>