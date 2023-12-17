<script  lang="ts">
    import Navbar from '$lib/components/navbar.svelte';
    import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";
	import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
	import { onMount } from 'svelte';

    import GreenGuy from '$lib/images/GreenGuy.png';
    import OrangeGuy from '$lib/images/OrangeGuy.png';
    import YellowGuy from '$lib/images/YellowGuy.png';
    import BlueGuy from '$lib/images/BlueGuy.png';
    import PurpleGuy from '$lib/images/PurpleGuy.png';
    import PinkGuy from '$lib/images/PinkGuy.png';
    import BeigeGuy from '$lib/images/BeigeGuy.png';

    let currentPath = '';
	let db;
    let email = '';
    let city = '';
    let sessionType = 'run'; // Variable to hold the session type
    let emailValidationMessage = ''; // Feedback message

	onMount(() => {

		const firebaseConfig = {
			apiKey: import.meta.env.VITE_API_KEY,
			authDomain: import.meta.env.VITE_AUTH_DOMAIN,
			databaseURL: import.meta.env.VIT_DATABASE_URL,
			projectId: import.meta.env.VITE_PROJECT_ID,   
			storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_APP_ID,
			measurementId: import.meta.env.VITE_MEASUREMENT_ID
		};
		const app = initializeApp(firebaseConfig);
    	const analytics = getAnalytics(app);
		db = getFirestore(app); //////

		currentPath = window.location.pathname;

	});
  

	/**
     * @param {string} email
     */
	function isValidEmail(email: string) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
  
	/**
     * @param {{ preventDefault: () => void; }} event
     */
     async function handleOnSubmit(event: any) {
     event.preventDefault();
        if (isValidEmail(email) && city) {
        const emailsRef = collection(db, "emails");
        const emailQuery = query(emailsRef, where("email", "==", email));
        const querySnapshot = await getDocs(emailQuery);

        if (querySnapshot.empty) {
            // Email does not exist, proceed to add it
            const newDoc = {
                email: email,
                city: city,
                type: sessionType,
                dateCreated: new Date()
            };
            try {
                const docRef = await addDoc(emailsRef, newDoc);
                console.log("Document written with ID: ", docRef.id);
                emailValidationMessage = 'Email successfully added!';
                email = '';
                city = '';
            } catch (e) {
                console.error("Error adding document: ", e);
                emailValidationMessage = 'Error adding email. Please try again.';
            }
        } else {
            // Email exists
            emailValidationMessage = 'This email already exists in our records.';
        }
    } else {
        emailValidationMessage = 'Please enter a valid email and city';
    }
}
</script>
  



<div class="block">
    <div class="flex flex-col h-[820px] justify-center bg-primary">
        <div class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full" />
        <Navbar />

        <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
            <a href="/">
                <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
            </a>
        </div>

        <div>
            <div>
                <div class="flex flex-col items-center w-full">
                    <h2 class="text-[45px] mt-5 sm:text-5xl md:text-5xl font-tiempos-headline z-10">Get Involved</h2>
                </div>
                <form class="flex flex-col items-center mt-12" on:submit={handleOnSubmit}>
                    <input type="email" bind:value={email} name="email" placeholder="Your Email" required class="p-2 mb-4 border rounded outline-none" />
                    <input type="text" bind:value={city} name="city" placeholder="Your City" required class="p-2 mb-4 border rounded outline-none" />
                    <select bind:value={sessionType} name="sessionType" class="p-2 mb-4 border rounded outline-none">
                        <option value="run">Run a session</option>
                        <option value="join">Join a session</option>
                    </select>
                    <button type="submit" class="bg-black text-white p-2 rounded border border-cool-grey hover:bg-[#706F6B] transition-colors duration-500 ease-in-out">Submit</button>
                    <p>{emailValidationMessage}</p>
                </form>
            </div>
            
        </div>
    </div>
</div>

<img src={GreenGuy} alt="Green Character" class="absolute      top-[5%] right-[50%] transform scale-[0.27]      md:top-[5%] lg:left-[15%] md:transform-scale-[0.6]" />
<img src={OrangeGuy} alt="Orange Character" class="absolute   top-[5%] left-[10%] transform scale-[0.4]        md:top-[5%] lg:left-[43%] md:transform-scale-[0.6]" />
<img src={YellowGuy} alt="Yellow Character" class="absolute     top-[16%] left-[67%] transform scale-[0.4]   md:top-[14%] lg:left-[66%] md:transform-scale-50" />

<img src={BlueGuy} alt="Blue Character" class="absolute   top-[47%] right-[63%] transform scale-[0.4]        md:top-[45%] md:left-[15%] md:transform-scale-50" />
<img src={PurpleGuy} alt="Purple Character" class="absolute   top-[60%] right-[40%] transform scale-[0.27]           md:top-[52%] md:left-[23%] md:transform-scale-55" />
<img src={PinkGuy} alt="Pink Character" class="absolute    top-[65%] left-[30%] transform scale-[0.4]          md:top-[61%] md:left-[54%] md:transform-scale-55" />
<img src={BeigeGuy} alt="Beige Character" class="absolute  top-[40.5%] left-[58%] transform scale-[0.27]            md:top-[41.5%] md:left-[67.5%] md:transform-scale-55" />
