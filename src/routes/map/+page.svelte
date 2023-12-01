<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />

<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from '$lib/components/navbar.svelte';
    import PopupWaterloo from './popups/popupWaterloo.svelte';
    import PopupVancouver from './popups/popupVancouver.svelte';
    import PopupCambridge from './popups/popupCambridge.svelte';
    import PopupOttawa from './popups/popupOttawa.svelte';
    import PopupKingston from './popups/popupKingston.svelte';
    import PopupBerkeley from './popups/popupBerkeley.svelte';
    import PopupWestern from './popups/popupWestern.svelte';
    import PopupMIT from './popups/popupMIT.svelte';
    import PopupToronto from './popups/popupToronto.svelte';
  
    let map;
    const centerPoint = [51.557152, -62.146388]
    const nodeWaterloo = [43.477305, -80.549252];
    const nodeVancouver = [49.282729, -123.120738];
    const nodeCambridge = [52.205338, 0.121817];
    const nodeOttawa = [45.421530, -75.697193];
    const nodeKingston = [44.231172, -76.485954];
    const nodeBerkeley = [37.871593, -122.272747];
    const nodeWestern = [43.009561, -81.275471];
    const nodeMIT = [42.3629, -71.0839];
    const nodeToronto = [43.664714, -79.385477];
   
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
            zoom: 3,
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

        const kingstonMarker = L.marker(nodeKingston as [number, number], { icon: defaultIcon });
        kingstonMarker.addTo(map);
        const popupContent5 = document.getElementById('kingston-popup')!.innerHTML;
        kingstonMarker.bindPopup(popupContent5, popupOptions);

        const berkeleyMarker = L.marker(nodeBerkeley as [number, number], { icon: defaultIcon });
        berkeleyMarker.addTo(map);
        const popupContent6 = document.getElementById('berkeley-popup')!.innerHTML;
        berkeleyMarker.bindPopup(popupContent6, popupOptions);

        const westernMarker = L.marker(nodeWestern as [number, number], { icon: defaultIcon });
        westernMarker.addTo(map);
        const popupContent7 = document.getElementById('western-popup')!.innerHTML;
        westernMarker.bindPopup(popupContent7, popupOptions);

        const mitMarker = L.marker(nodeMIT as [number, number], { icon: defaultIcon });
        mitMarker.addTo(map);
        const popupContent8 = document.getElementById('mit-popup')!.innerHTML;
        mitMarker.bindPopup(popupContent8, popupOptions);

        const torontoMarker = L.marker(nodeToronto as [number, number], { icon: defaultIcon });
        torontoMarker.addTo(map);
        const popupContent9 = document.getElementById('toronto-popup')!.innerHTML;
        torontoMarker.bindPopup(popupContent9, popupOptions); 
      });
    });
  </script>

  <div id="map" class="w-screen h-screen">
    <PopupWaterloo />
    <PopupVancouver />
    <PopupCambridge />
    <PopupOttawa />
    <PopupKingston />
    <PopupBerkeley />
    <PopupWestern />
    <PopupMIT />
    <PopupToronto />
  </div>

  <Navbar />


  <style>
    #map {
        width: 100%;
        filter: sepia(0.4) brightness(1) contrast(0.9) saturate(1.2);
    }
</style>
