<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />

<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from '$lib/components/navbar.svelte';
    import MarkerShadow from '$lib/images/marker-shadow.png';
    import Node from './Node.svelte';
  
    let map: any;
    const centerPoint = [51.557152, -62.146388]

    const locations = [
      { 
        id: 'waterloo',
        name: 'Socratica',
        date: 'JAN 2022',
        location: 'WATERLOO, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-cBMgU2QXqXZQSv1/events?lt=light',
        coordinates: [43.477305, -80.549252],
      },
      { 
        id: 'toronto',
        name: 'Socratica',
        date: 'JAN 2023',
        location: 'TORONTO, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-PxG5QruZfgz28XB/events?lt=light',
        coordinates: [43.664714, -79.385477],
      },
      {
        id: 'vancouver',
        name: 'Atelier',
        date: 'SEPT 2023',
        location: 'VANCOUVER, BC',
        lumaLink: 'https://lu.ma/embed/calendar/cal-CvuDnsONPxinxqk/events?lt=light',
        coordinates: [49.282729, -123.120738],
      },
      {
        id: 'cambridge-uk',
        name: 'Scale Down',
        date: 'OCT 2023',
        location: 'CAMBRIDGE, UK',
        lumaLink: 'https://lu.ma/embed/calendar/cal-vHCyjMqqjpdduOt/events?lt=light',
        coordinates: [52.205338, 0.121817],
      },
      {
        id: 'ottawa',
        name: 'Agora',
        date: 'OCT 2023',
        location: 'OTTAWA, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-xPDTKP81aHIflKD/events?lt=light',
        instagramLink: 'https://www.instagram.com/socratica.info',
        coordinates: [45.421530, -75.697193],
      },
      {
        id: 'kingston',
        name: 'id8.blankcanvas',
        date: 'OCT 2023',
        location: 'KINGSTON, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-AxzTU0DF1vlwRSI/events?lt=light',
        coordinates: [44.231172, -76.485954],
      },
      {
        id: 'berkeley',
        name: 'Side Project Sundays',
        date: 'SEPT 2023',
        location: 'BERKELEY, CA',
        lumaLink: 'https://lu.ma/embed/calendar/cal-CRtUehgIQHLEB3o/events?lt=light',
        coordinates: [37.871593, -122.272747],
      },
      {
        id: 'western',
        name: 'Momentum',
        date: 'SEPT 2023',
        location: 'LONDON, ON',
        lumaLink: 'https://lu.ma/embed/calendar/cal-gt0OmSf2cUw1HHl/events?lt=light',
        coordinates: [43.009561, -81.275471],
      },
      {
        id: 'mit',
        name: 'Friendly Beans',
        date: 'DEC 2023',
        location: 'CAMBRIDGE, MA',
        lumaLink: 'https://lu.ma/embed/calendar/cal-2Z2ZQZQZQZQZQZQ/events?lt=light',
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
            shadowUrl: MarkerShadow,
            iconSize: [25, 41], 
            shadowSize: [41, 41],
            iconAnchor: [12, 41], 
            shadowAnchor: [13, 41], 
            popupAnchor: [1, -34]
        });

        const isMobile = window.innerWidth < 768;
        const popupOptions: L.PopupOptions = {
            minWidth: isMobile ? 285 : 400,
            maxWidth: isMobile ? 285 : 400,
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

<Navbar />

<div id="map" class="w-screen h-screen z-10">
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


<style>
  #map {
    width: 100%;
  }
</style>
