<template>
    <v-container>
        <div class="d-flex flex-column ga-4 position-relative">
            <div style="position: absolute; left: 5px; top: 5px; z-index: 2;">
                <v-btn href="/">
                    vissza
                </v-btn>
            </div>
            <v-card class="d-flex flex-column text-center ga-4 pa-4">
                <p class="text-h3">Impresszum</p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Üzemeltető adatai</p>
                <p><strong>Név:</strong> Halgas János egyéni vállalkozó</p>
                <p><strong>Székhely:</strong> 2735 Dánszentmiklós, Dózsa György utca 23/A</p>
                <p><strong>Adószám:</strong> 90830318-1-33</p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Kapcsolat</p>
                <p><strong>E-mail:</strong> info@halgasvill.hu</p>
                <p><strong>Telefonszám:</strong>+36 20 325 5394</p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Tárhelyszolgáltató</p>
                <p><strong>Név:</strong> Sybell Informatika Kft.</p>
                <p><strong>Székhely:</strong> 1158 Budapest, Késmárk utca 7/b</p>
                <p><strong>Weboldal:</strong> https://sybell.hu</p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Felelősségi nyilatkozat</p>
                <p>
                    Az üzemeltető mindent megtesz annak érdekében, hogy a weboldalon megjelenő információk pontosak és naprakészek legyenek, azonban felelősséget nem vállal az esetleges elírásokért vagy technikai hibákért.
                </p>
            </v-card>
        </div>
    </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
