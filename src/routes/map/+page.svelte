<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />

<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from '$lib/components/navbar.svelte';
    // import PopupWaterloo from './popups/popupWaterloo.svelte';
    import PopupVancouver from './popups/popupVancouver.svelte';
    import PopupCambridge from './popups/popupCambridge.svelte';
    import PopupOttawa from './popups/popupOttawa.svelte';
    import PopupKingston from './popups/popupKingston.svelte';
    import PopupBerkeley from './popups/popupBerkeley.svelte';
    import PopupWestern from './popups/popupWestern.svelte';
    import PopupMIT from './popups/popupMIT.svelte';
    import PopupToronto from './popups/popupToronto.svelte';

    import Node from './Node.svelte';
  
    let map: any;
    const centerPoint = [51.557152, -62.146388]

    const locations = [
      { 
        id: 'waterloo',
        name: 'Socratica',
        date: 'JAN 2022',
        location: 'WATERLOO, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-cBMgU2QXqXZQSv1/events',
        coordinates: [43.477305, -80.549252],
      },
      { 
        id: 'toronto',
        name: 'Socratica',
        date: 'JAN 2023',
        location: 'TORONTO, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-PxG5QruZfgz28XB/events',
        coordinates: [43.664714, -79.385477],
      },
      {
        id: 'vancouver',
        name: 'Atelier',
        date: 'SEPT 2023',
        location: 'VANCOUVER, BC',
        lumaLink: 'https://lu.ma/embed/calendar/cal-CvuDnsONPxinxqk/events',
        coordinates: [49.282729, -123.120738],
      },
      {
        id: 'cambridge-uk',
        name: 'Scale Down',
        date: 'OCT 2023',
        location: 'CAMBRIDGE, UK',
        lumaLink: 'https://lu.ma/embed/calendar/cal-vHCyjMqqjpdduOt/events',
        coordinates: [52.205338, 0.121817],
      },
      {
        id: 'ottawa',
        name: 'Agora',
        date: 'OCT 2023',
        location: 'OTTAWA, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-xPDTKP81aHIflKD/events',
        coordinates: [45.421530, -75.697193],
      },
      {
        id: 'kingston',
        name: 'id8.blankcanvas',
        date: 'OCT 2023',
        location: 'KINGSTON, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-AxzTU0DF1vlwRSI/events',
        coordinates: [44.231172, -76.485954],
      },
      {
        id: 'berkeley',
        name: 'Side Project Sundays',
        date: 'SEPT 2023',
        location: 'BERKELEY, CA',
        lumaLink: 'https://lu.ma/embed/calendar/cal-CRtUehgIQHLEB3o/events',
        coordinates: [37.871593, -122.272747],
      },
      {
        id: 'western',
        name: 'Momentum',
        date: 'SEPT 2023',
        location: 'LONDON, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-gt0OmSf2cUw1HHl/events',
        coordinates: [43.009561, -81.275471],
      },
      {
        id: 'mit',
        name: 'Friendly Beans',
        date: 'DEC 2023',
        location: 'CAMBRIDGE, MA',
        lumaLink: 'https://lu.ma/embed/calendar/cal-2Z2ZQZQZQZQZQZQ/events',
        coordinates: [42.3629, -71.0839],
      }
    ];

   
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
            maxWidth: 400,
            // minWidth: 285,
            // maxWidth: 285,
        };

        function createMarkerAndBindPopup(location: any, map: any, popupOptions: any) {
          const marker = L.marker(location.coordinates, { icon: defaultIcon });
          marker.addTo(map);
          const popupContent = document.getElementById(location.id)!.innerHTML;
          marker.bindPopup(popupContent, popupOptions);
        }

        locations.forEach(location => createMarkerAndBindPopup(location, map, popupOptions));
      });
    });
  </script>

<div id="map" class="w-screen h-screen">
  {#each locations as location}
    <Node 
      id={location.id}
      name={location.name}
      date={location.date}
      location={location.location}
      lumaLink={location.lumaLink} 
    />
  {/each}
</div>

<Navbar />


<style>
  #map {
    width: 100%;
  }
</style>
