import { Hono } from "hono";
import { AppContext } from "../types";
import { renderView } from "../edge";
import { Trail } from "../entities/trail";

export const trail = new Hono<AppContext>()

trail
    .get('/', async (c) => {
        const session = c.get('session')
        const trails: Trail[] = [
            { id: 1, name: 'IMTS', enigmes: [] },
            { id: 2, name: 'Dinard', enigmes: [] },
            { id: 3, name: 'Mosaique', enigmes: [] }
        ]
        const html = await renderView('trails', { session, trails })
        return c.html(html)
    })
    .get('/:tid/enigmes/:eid', async (c) => {
        const session = c.get('session')
        const { tid, eid } = c.req.param()
        const enigmes = [
            { id: 1, order: 1, label: "Statue sans tête", latitude: 48.64047194970198, longitude: -2.0759981144008903 },
            { id: 2, order: 2, label: "Portail", latitude: 48.64047194970198, longitude: -2.0759981144008903 },
            { id: 3, order: 3, label: "Fablab", latitude: 48.63841988204647, longitude: -2.0763836564060045 }
        ]
        const html = await renderView('enigmes', { session, enigme: enigmes[parseInt(eid)] })
        return c.html(html)
    })
    .post('/:tid/enigmes/:eid', async (c) => {
        const { tid, eid } = c.req.param()
        const body = await c.req.json()
        console.log(body)
        const distance = haversineDistance(body.latitude, body.longitude, 48.63841988204647, -2.0763836564060045)
        if (distance <= 9000) {
            return c.json({ success: true, message: 'Énigme validée ✅' })
        } else {
            return c.json({ success: false, message: 'Encore trop loin ❌' })
        }
    })
    .delete('')

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // rayon Terre en mètres
    const toRad = x => x * Math.PI / 180;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d; // distance en mètres
}