d<template>
    <v-container>

        <div class="d-flex flex-column ga-4 position-relative">
            <div style="position: absolute; left: 5px; top: 5px; z-index: 2;">
                <v-btn href="/">
                    vissza
                </v-btn>
            </div>
            <v-card class="d-flex flex-column text-center ga-4 pa-4">
                <p class="text-h3">Adatkezelési tájékoztató</p>
                <p class="">
                    Hatályos: 2025.01.01.
                </p>
            </v-card>
            
            <v-card class="pa-4">
                <p class="text-h4 mb-4">Az adatkezelő adatai</p>
                <div class="px-4">
                    <p><strong>Adatkezelő:</strong> Halgas János ev.</p>
                    <p><strong>Weboldal:</strong> halgasvill.hu</p>
                    <p><strong>Kapcsolat:</strong> info@halgasvill.hu</p>
                </div>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Kezelt adatok köre</p>

                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Név</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>E-mail cím</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Telefonszám (opcionális)</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Üzenet / leírás tartalma</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Értékelés szövege és pontszáma</p>
                </div>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Az adatkezelés célja</p>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Kapcsolatfelvétel és segítségkérések kezelése</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Értékelések beküldése és megjelenítése</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Visszaélések és spam megelőzése</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>A weboldal biztonságos működésének biztosítása</p>
                </div>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Az adatkezelés jogalapja</p>
                <p>
                    Az adatkezelés az érintett önkéntes hozzájárulásán alapul
                    (GDPR 6. cikk (1) a)), valamint bizonyos esetekben az adatkezelő
                    jogos érdekén (GDPR 6. cikk (1) f)).
                </p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Az adatok tárolásának időtartama</p>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Kapcsolatfelvétel adatai: legfeljebb 12 hónap</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Értékelések: törlési kérelemig vagy a megjelenítés idejéig</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Megerősítő kódok: legfeljebb 15 percig</p>
                </div>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Adatfeldolgozók</p>
                <p>
                    Az adatokat kizárólag az adatkezelő, valamint a weboldal működéséhez
                    szükséges szolgáltatók (tárhelyszolgáltató, levelezőrendszer) kezelik.
                </p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Érintetti jogok</p>
                <p>Az érintett jogosult:</p>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Tájékoztatást kérni a kezelt adatokról</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Adatainak helyesbítését kérni</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Adatainak törlését kérni</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Az adatkezelés korlátozását kérni</p>
                </div>
                <div class="d-flex align-center">
                    <v-icon>
                        mdi-circle-small
                    </v-icon>
                    <p>Hozzájárulását bármikor visszavonni</p>
                </div>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Panasztétel</p>
                <p>
                    Az érintett jogosult panaszt tenni a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH), amennyiben megítélése szerint a személyes adatok kezelése nem felel meg a jogszabályoknak.
                </p>
                <p>
                    <strong>NAIH</strong><br />
                    1055 Budapest, Falk Miksa utca 9-11.<br />
                    Web: https://www.naih.hu
                </p>
            </v-card>

            <v-card class="pa-4">
                <p class="text-h4">Cookie-k</p>
                <p>
                    A weboldal kizárólag a működéshez szükséges technikai cookie-kat használja.
                    Marketing vagy statisztikai célú cookie-k nem kerülnek alkalmazásra.
                </p>
            </v-card>
        </div>
    </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
</style>
