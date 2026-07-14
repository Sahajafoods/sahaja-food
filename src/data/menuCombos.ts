export type TabKey = 'nonveg' | 'veg' | 'healthy'

export const TAB_LABELS: Record<TabKey, string> = { nonveg: 'Non Veg', veg: 'Veg', healthy: 'Healthy Balance' }
export const TAB_COLORS: Record<TabKey, string> = { nonveg: 'var(--nv)', veg: 'var(--vg)', healthy: 'var(--m)' }

export const COMBOS: Record<TabKey, { name: string; items: string[]; img: string }[]> = {
  nonveg: [
    { name: 'Combo 1', items: ['3 Phulkas', 'Chicken Gravy', 'Sabji', 'Salad'], img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=700&q=80&auto=format&fit=crop' },
    { name: 'Combo 2', items: ['White Rice', 'Chicken Gravy', 'Sabji', 'Salad'], img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=700&q=80&auto=format&fit=crop' },
  ],
  veg: [
    { name: 'Combo 1', items: ['3 Phulkas', 'Veg Gravy', 'Sabji', 'Salad'], img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=80&auto=format&fit=crop' },
    { name: 'Combo 2', items: ['White Rice', 'Veg Gravy', 'Sabji', 'Salad'], img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&q=80&auto=format&fit=crop' },
  ],
  healthy: [
    { name: 'Combo 1', items: ['Millet Roti (3)', 'Veg Sabji', 'Salad', 'Egg', 'Cut Fruit'], img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80&auto=format&fit=crop' },
    { name: 'Combo 2', items: ['Millet Rice', 'Chicken Gravy', 'Veg Sabji', 'Salad', 'Egg', 'Cut Fruit'], img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80&auto=format&fit=crop' },
    { name: 'Combo 3', items: ['Millet Rice', 'Veg Gravy', 'Veg Sabji', 'Salad', 'Protein Based Sabji or Sprouts', 'Egg', 'Cut Fruit'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80&auto=format&fit=crop' },
    { name: 'Combo 4', items: ['Millet Rice', 'Veg Gravy', 'Veg Sabji', 'Salad', 'Egg', 'Cut Fruit'], img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80&auto=format&fit=crop' },
  ],
}
