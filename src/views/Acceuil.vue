// SECTION HTML
<template>
    <div id="content" class='meteo'>
        <main>
            <!-- forme pour entrer la ville pour meteo -->
            <form action="#" method="post" @submit='cityEntered'>
                <input 
                    type="text" 
                    name="city" 
                    class="city"
                    placeholder="Ville"
                    v-model='city'
                    required
                >
                <input type="submit" value="Envoyer" class='submit'>
            </form>
        </main>
    </div>
</template>

// SECTION CODE 
<script>
export default {
    name: "CityEntered",
    data() {
        return {
            city: "",
        }
    },
    methods: {
        cityEntered(e) {
            e.preventDefault()
            // envoie information ville entree
            this.$router.push({
                path: "/meteo/" + this.city
            })
        }
    }
}
</script>

// SECTION CSS 
<style scoped>
.meteo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.meteo input.city {
  width: 300px;
  border-radius: 8px;
  border: none;
  padding: 15px 15px;
  background: #464646;
  font-size: 16px;
  color: #ccc;
}
.meteo input.submit {
  border-radius: 8px;
  border: none;
  padding: 15px 15px;
  margin-left: 5px;
  background-color: #0f5781;
  font-size: 16px;
  color: #ccc;
  transition: background-color 0.2s ease;
  cursor: pointer;
}
.meteo input.submit:hover {
  background-color: #0c4769;
}
</style>