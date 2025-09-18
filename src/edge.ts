// edge.ts
import { Edge } from 'edge.js'
import { join } from 'node:path'

// Crée une instance d'Edge
export const edge = new Edge({ cache: false })

// Indique à Edge où trouver les vues
edge.mount(join(process.cwd(), 'views'))

// Fonction utilitaire pour le rendu des vues avec le layout
export async function renderView(view: string, data: object = {}) {
    const content = String(await edge.render(view, data));
    const layout = await edge.render('layout', { ...data, title: 'Quest', content });
    return layout;
}