<script  lang="ts">
    import MapTrifold from '$lib/images/MapTrifold.png';
    import Eye from '$lib/images/Eye.png';
    import DarkHouse from '$lib/images/DarkHouse.png';
    import UsersThree from '$lib/images/UsersThree.png';

    import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";
	import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
	import { onMount } from 'svelte';

    let currentPath = '';
	let db;
    let email = '';
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
		event.preventDefault(); // prevent the form from submitting
		if (isValidEmail(email)) {
			console.log("Valid Email:", email);
			emailValidationMessage = ''; // Clear any previous error messages

			// Check if the email already exists in Firestore
			const emailsRef = collection(db, "emails");
			const querySnapshot = await getDocs(emailsRef);
			let emailExists = false;

			querySnapshot.forEach((doc) => {
				if (doc.data().email === email) {
					emailExists = true;
				}
			});

			// Add email to Firestore if it doesn't exist
            if (!emailExists) {
                try {
                    const docRef = await addDoc(emailsRef, {
                        email: email,
                        type: sessionType // Add session type
                    });
                    console.log("Document written with ID: ", docRef.id);
                    emailValidationMessage = 'Email successfully added!';
                    email = '';
                } catch (e) {
                    console.error("Error adding document: ", e);
                    emailValidationMessage = 'Error adding email. Please try again.';
                }
            } else {
                console.log("Email already exists: ", email);
                emailValidationMessage = 'This email already exists in our records.';
            }
        } else {
            console.log("Invalid Email:", email);
            emailValidationMessage = 'Please enter a valid email';
        }
    }
</script>
  



<div class="block">
<div class="flex flex-col h-[820px] justify-center bg-primary">
    <div class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full" />

    <div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
        <a href="/" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={DarkHouse} alt="home" class="w-4 h-4 md:w-6 md:h-6" />
            <span>HOME</span>
        </a>
        <a href="/about" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={UsersThree} alt="Users" class="w-4 h-4 md:w-6 md:h-6" />
            <span>ABOUT</span>
        </a>
        <a href="/map" class="bg-white md:bg-primary py-2 px-2.5  text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
            <span>MAP</span>
        </a>
        <a href="/get-involved" class="cursor-not-allowed opacity-50 bg-cool-grey py-2 px-2.5  text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={Eye} alt="Eye" class="w-4 h-4 md:w-6 md:h-6" />
            <span>GET INVOLVED</span>
        </a>
    </div>

    <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
        <a href="/">
            <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
        </a>
    </div>

    <div>
        <div>
            <div class="flex flex-col items-center absolute w-full" style="top: 40%;">
                <h2 class="text-[45px] mt-5 sm:text-5xl md:text-5xl font-tiempos-headline z-10">Get Involved</h2>
            </div>
            <form class="flex flex-col items-center mt-40" on:submit={handleOnSubmit}>
                <input type="email" bind:value={email} name="email" placeholder="Your Email" required class="p-2 mb-4 border rounded outline-none" />
                <select bind:value={sessionType} name="sessionType" class="p-2 mb-4 border rounded outline-none">
                    <option value="run">Run a session</option>
                    <option value="join">Join a session</option>
                </select>
                <button type="submit" class="bg-black text-white p-2 rounded border border-cool-grey hover:bg-[#706F6B]  transition-colors duration-500 ease-in-out ">Submit</button>
                <p>{emailValidationMessage}</p>
            </form>
        </div>
        
    </div>
</div>
</div>