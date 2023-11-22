<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />

<script lang="ts">
    import { onMount } from 'svelte';
    import PopupWaterloo from './popups/popupWaterloo.svelte';
    import PopupVancouver from './popups/popupVancouver.svelte';
    import PopupCambridge from './popups/popupCambridge.svelte';
    import PopupOttawa from './popups/popupOttawa.svelte';
    import UsersThree from '$lib/images/UsersThree.png';
	import Eye from '$lib/images/Eye.png';
    import DarkHouse from '$lib/images/DarkHouse.png';
    import MapTrifold from '$lib/images/MapTrifold.png';
  
    let map;
    const centerPoint = [51.557152, -62.146388]
    const nodeWaterloo = [43.477305, -80.549252];
    const nodeVancouver = [49.282729, -123.120738];
    const nodeCambridge = [52.205338, 0.121817];
    const nodeOttawa = [45.421530, -75.697193];
   
    onMount(() => {
      // Dynamically import Leaflet only on the client-side
      import('leaflet').then(L => {
        let mapOptions: {
            center: [number, number],
            zoom: number
            minZoom: number,
            maxZoom: number,
            maxBounds: L.LatLngBounds,
            maxBoundsViscosity: number
        } = {
            center: centerPoint as [number, number],
            zoom: 4,
            minZoom: 3,
            maxZoom: 18,
            maxBounds: L.latLngBounds(
                L.latLng(-90, -180),
                L.latLng(90, 180)
            ),
            maxBoundsViscosity: 1.0 
        }
  
        map = L.map('map', mapOptions);
  
        // const layer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        //     attribution: ''
        // });

        const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ''
        });

        map.addLayer(layer);
        var defaultIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'http://cdn.leafletjs.com/leaflet-0.7.3/images/marker-shadow.png',
            iconSize: [25, 41], 
            shadowSize: [41, 41],
            iconAnchor: [12, 41], 
            shadowAnchor: [13, 41], 
            popupAnchor: [1, -34]
        });
        const popupOptions: L.PopupOptions = {
            minWidth: 350,
            maxWidth: 350,
            // minWidth: 285,
            // maxWidth: 285,
        };
  
        const waterlooMarker = L.marker(nodeWaterloo as [number, number], { icon: defaultIcon });
        waterlooMarker.addTo(map);
        const popupContent = document.getElementById('waterloo-popup')!.innerHTML;
        waterlooMarker.bindPopup(popupContent, popupOptions);

        const vancouverMarker = L.marker(nodeVancouver as [number, number], { icon: defaultIcon });
        vancouverMarker.addTo(map);
        const popupContent2 = document.getElementById('vancouver-popup')!.innerHTML;
        vancouverMarker.bindPopup(popupContent2, popupOptions);

        const cambridgeMarker = L.marker(nodeCambridge as [number, number], { icon: defaultIcon });
        cambridgeMarker.addTo(map);
        const popupContent3 = document.getElementById('cambridge-uk-popup')!.innerHTML;
        cambridgeMarker.bindPopup(popupContent3, popupOptions);

        const ottawaMarker = L.marker(nodeOttawa as [number, number], { icon: defaultIcon });
        ottawaMarker.addTo(map);
        const popupContent4 = document.getElementById('ottawa-popup')!.innerHTML;
        ottawaMarker.bindPopup(popupContent4, popupOptions);
      });
    });
  </script>

  <div id="map" class="w-screen h-screen">
    <PopupWaterloo />
    <PopupVancouver />
    <PopupCambridge />
    <PopupOttawa />
  </div>

  <div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
    <a href="/" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={DarkHouse} alt="home" class="w-4 h-4 md:w-6 md:h-6" />
        <span>HOME</span>
    </a>
    <a href="/about" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={UsersThree} alt="Users" class="w-4 h-4 md:w-6 md:h-6" />
        <span>ABOUT</span>
    </a>
    <a href="/map" class="cursor-not-allowed opacity-50 bg-cool-grey py-2 px-2.5  text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
        <span>MAP</span>
    </a>
    <a href="/get-involved" class="bg-white md:bg-primary py-2 px-2.5  text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={Eye} alt="Eye" class="w-4 h-4 md:w-6 md:h-6" />
        <span>GET INVOLVED</span>
    </a>
</div>


  <style>
    #map {
        width: 100%;
        filter: sepia(0.4) brightness(1) contrast(0.9) saturate(1.2);
    }
</style>
