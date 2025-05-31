import { json } from '@sveltejs/kit';
import locationsData from '../map/locations.json';

export async function GET() {
	return json(locationsData);
} 