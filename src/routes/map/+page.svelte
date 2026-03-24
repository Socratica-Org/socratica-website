<script lang="ts">
  import { onMount } from "svelte";

  // Client-side redirect fallback (server-side redirect in +page.server.ts)
  onMount(() => {
    window.location.href = "https://map.socratica.info";
  });

  // Original map functionality commented out:
  // import Navbar from "$lib/components/navbar.svelte";
  // import MarkerShadow from "$lib/images/marker-shadow.png";
  // import Node from "./Node.svelte";
  // import { locations } from "./locations";
  //
  // let map: any;
  // const centerPoint = [51.557152, -62.146388];
  //
  // onMount(() => {
  //   import("leaflet").then((L) => {
  //     let mapOptions = {
  //       center: centerPoint as [number, number],
  //       zoom: 3,
  //       minZoom: 3,
  //       maxZoom: 18,
  //       maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
  //       maxBoundsViscosity: 1.0,
  //     };
  //     map = L.map("map", mapOptions);
  //     const layer = L.tileLayer(
  //       "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  //       { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
  //     );
  //     map.addLayer(layer);
  //     var defaultIcon = L.icon({
  //       iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  //       shadowUrl: MarkerShadow,
  //       iconSize: [25, 41],
  //       shadowSize: [41, 41],
  //       iconAnchor: [12, 41],
  //       shadowAnchor: [13, 41],
  //       popupAnchor: [1, -34],
  //     });
  //     const isMobile = window.innerWidth < 768;
  //     const popupOptions = { minWidth: isMobile ? 285 : 400, maxWidth: isMobile ? 285 : 400 };
  //     function createMarkerAndBindPopup(location, map, popupOptions, locationId) {
  //       const marker = L.marker(location.coordinates, { icon: defaultIcon });
  //       marker.addTo(map);
  //       const popupContent = document.getElementById(location.id)!.innerHTML;
  //       marker.bindPopup(popupContent, popupOptions);
  //       marker.on("popupopen", () => { window.history.pushState({}, "", `/map?location=${location.id}`); });
  //       if (locationId === location.id) {
  //         setTimeout(() => {
  //           map.panTo(marker.getLatLng(), { animate: true, duration: 1 });
  //           setTimeout(() => { marker.openPopup(); }, 1000);
  //         }, 500);
  //       }
  //     }
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const locationId = urlParams.get("location") ?? "";
  //     locations.forEach((location) => createMarkerAndBindPopup(location, map, popupOptions, locationId));
  //   });
  // });
</script>

<p>Redirecting to <a href="https://map.socratica.info">map.socratica.info</a>...</p>

<!-- Original map markup commented out:
<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />
<Navbar />
<div id="map" class="w-screen h-screen z-10">
  {#each locations as location}
    <Node id={location.id} name={location.name} date={location.date}
      location={location.location.toUpperCase()} lumaLink={location.lumaLink}
      imageSrc={location.imageSrc} joinLink={location.joinLink}
      websiteLink={location.websiteLink} instagramLink={location.instagramLink}
      twitterLink={location.twitterLink} youtubeLink={location.youtubeLink} />
  {/each}
</div>
<style>#map { width: 100%; }</style>
-->
