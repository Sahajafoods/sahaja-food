export type TabKey = 'nonveg' | 'veg' | 'starters'

export const TAB_LABELS: Record<TabKey, string> = { nonveg: 'Non Veg', veg: 'Veg', starters: 'Starters & Curries' }
export const TAB_COLORS: Record<TabKey, string> = { nonveg: 'var(--nv)', veg: 'var(--vg)', starters: 'var(--m)' }

export interface ComboSection {
  label: string
  value: string
}

export interface Combo {
  name: string
  img: string
  badge?: string
  sections: ComboSection[]
}

export const COMBOS: Record<'nonveg' | 'veg', Combo[]> = {
  nonveg: [
    {
      name: 'Classic Chicken Feast',
      img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Sweet', value: 'Kheer' },
        { label: 'Salad', value: 'Egg · Lime · Cucumber' },
        { label: 'Bread', value: 'Phulka (2 pcs)' },
        { label: 'Gravy', value: 'Chicken Kurma / Butter Chicken' },
        { label: 'Rice', value: 'Ghee Rice / Biryani Rice' },
        { label: 'Dry', value: 'Chicken Chukka / Kebab' },
        { label: 'Extras', value: 'White Rice + Rasam · Ice Cream + Beeda' },
      ],
    },
    {
      name: 'Chicken Biryani Special',
      img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Sweet', value: 'Gulab Jamun / Dry Jamun' },
        { label: 'Salad', value: 'Egg Masala / Boiled Egg · Lime · Cucumber' },
        { label: 'Bread', value: 'Phulka / Roti / Puri (3 pcs)' },
        { label: 'Gravy', value: 'Paneer Masala / Veg Kurma' },
        { label: 'Rice', value: 'Chicken Biryani' },
        { label: 'Dry', value: 'Chicken Kebab / Chicken Tikka' },
        { label: 'Extras', value: 'Cucumber Salad · White Rice + Rasam' },
      ],
    },
    {
      name: 'Mutton Biryani Combo',
      img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Sweet', value: 'Jalebi / Rabdi' },
        { label: 'Salad', value: 'Egg · Lime · Cucumber' },
        { label: 'Bread', value: 'Phulka (2 pcs)' },
        { label: 'Gravy', value: 'Mushroom Masala / Paneer Masala' },
        { label: 'Rice', value: 'Mutton Biryani' },
        { label: 'Dry', value: 'Chicken Lollipop / Chicken Tikka · Hariyali Chicken' },
        { label: 'Extras', value: 'White Rice + Rasam · Beeda' },
      ],
    },
    {
      name: 'Mutton & Chicken Grand',
      img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Sweet', value: 'Rasmalai / Putharekulu' },
        { label: 'Salad', value: 'Egg · Lime · Cucumber' },
        { label: 'Bread', value: 'Phulka (2 pcs)' },
        { label: 'Mutton', value: 'Mutton Chops / Mutton Kheema / Nihari Gosht' },
        { label: 'Rice', value: 'Mutton Biryani (Seeraga Samba Rice)' },
        { label: 'Dry', value: 'Chicken Lollipop / Chicken Tikka / Hariyali Chicken' },
        { label: 'Extras', value: 'Cucumber Salad · White Rice + Rasam · Ice Cream + Beeda' },
      ],
    },
    {
      name: 'Premium Mutton Feast',
      badge: 'PREMIUM',
      img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Sweet', value: 'Rasmalai / Paal Kolukattai' },
        { label: 'Bread', value: 'Phulka (2 pcs) / Ragi Ball (1 pc)' },
        { label: 'Mutton Gravy', value: 'Mutton Thanni Kozhambu / Dhal Gosht / Kheema Ball Kozhambu' },
        { label: 'Rice', value: 'Seeraga Samba Mutton Biryani / Mutton Dum Biryani' },
        { label: 'Chicken Gravy', value: 'Chettinad Chicken / Chicken Kurma Masala' },
        { label: 'Dry', value: 'Pepper Chicken / Chilli Chicken' },
        { label: 'Extras', value: 'White Rice + Rasam · Ice Cream + Beeda' },
      ],
    },
  ],
  veg: [
    {
      name: 'Simple Veg Meal',
      img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Sweet', value: 'Jamun / Mysore Pak / Payasa' },
        { label: 'Starter', value: 'Aloo Kebab / Veg Bonda' },
        { label: 'Rice', value: 'Menthya Bath / Peas Pulav / Veg Pulav' },
        { label: 'Extras', value: 'White Rice + Rasam · Beans Sabji / Aloo Fry · Corn & Cucumber Salad · Pickle + Curd + Papad' },
      ],
    },
    {
      name: 'Veg Biryani Celebration',
      img: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Welcome', value: 'Welcome Drink' },
        { label: 'Sweet', value: 'Chiroti / Jamun / Badam Puri · Payasa' },
        { label: 'Bread', value: 'Puri + Chutney + Veg Kurma or Sagu' },
        { label: 'Starter', value: 'Gobi Manchurian / Aloo Kebab / Ladies Finger Fry / Bonda' },
        { label: 'Rice', value: 'Veg Biryani / Kaju Pulav' },
        { label: 'Extras', value: 'White Rice + Sambar + Rasam + Pickle + Curd + Papad · Sabji (any 2) · Beeda' },
      ],
    },
    {
      name: 'Premium Veg Feast',
      badge: 'PREMIUM',
      img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=85&auto=format&fit=crop',
      sections: [
        { label: 'Welcome', value: 'Welcome Drink + Snacks' },
        { label: 'Sweet', value: 'Rasgolla / Kova Barfi / Paal Kolukattai · Payasam' },
        { label: 'Bread', value: 'Phulka + Veg Gravy' },
        { label: 'Starter', value: 'Paneer / Baby Corn / Mushroom Manchurian' },
        { label: 'Rice', value: 'Fried Rice / Veg Biryani / Ghee Rice / Mushroom Biryani' },
        { label: 'Extras', value: 'White Rice + Sambar + Rasam + Pickle + Curd + Papad · 2 types of Sabji · Ice Cream' },
      ],
    },
  ],
}

export interface StarterCategory {
  title: string
  items: string[]
}

export const STARTER_CATEGORIES: StarterCategory[] = [
  {
    title: 'Chicken Starters',
    items: ['Chicken Sukka', 'Chicken Kebab', 'Chicken 65', 'Chicken Tikka', 'Chicken Lollipop', 'Chicken Hariyali', 'Chicken Pepper', 'Chilli Chicken'],
  },
  {
    title: 'Mutton Starters',
    items: ['Mutton Chops', 'Mutton Sukka', 'Mutton Pepper Fry', 'Kheema Vada'],
  },
  {
    title: 'Fish & Seafood',
    items: ['Prawns Ghee Roast', 'Prawns 65', 'Butter Garlic Prawns', 'Fish Fry (Seasonal)', 'Nethili Fry', 'Bangada Fry', 'Seer Fish Fry', 'Crab Sukka', 'Squid Pepper Fry', 'Black Pomfret Fry'],
  },
  {
    title: 'Chicken Curries',
    items: ['Chicken Chettinad', 'Naatu Kozhi Kurma', 'Butter Chicken', 'Bhuna Masala', 'Malwani Chicken', 'Hariyali Chicken', 'Chicken Kheema with Green Peas & Potatoes', 'Peshawari Chicken Stew'],
  },
]

// Lightweight preview shape used by the Home page's menu teaser section.
export interface PreviewCombo {
  name: string
  items: string[]
  img: string
}

export const PREVIEW_COMBOS: Record<'nonveg' | 'veg', PreviewCombo[]> = {
  nonveg: [
    {
      name: 'Classic Chicken Feast',
      items: ['Chicken Kurma / Butter Chicken', 'Ghee Rice / Biryani Rice', 'Chicken Chukka / Kebab', 'Kheer'],
      img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=700&q=85&auto=format&fit=crop',
    },
    {
      name: 'Mutton Biryani Combo',
      items: ['Mutton Biryani', 'Chicken Lollipop / Chicken Tikka', 'Mushroom Masala / Paneer Masala', 'Jalebi / Rabdi'],
      img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=85&auto=format&fit=crop',
    },
  ],
  veg: [
    {
      name: 'Veg Biryani Celebration',
      items: ['Veg Biryani / Kaju Pulav', 'Gobi Manchurian / Aloo Kebab', 'Puri + Chutney + Veg Kurma', 'Chiroti / Jamun'],
      img: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=700&q=85&auto=format&fit=crop',
    },
    {
      name: 'Premium Veg Feast',
      items: ['Veg Biryani / Ghee Rice / Mushroom Biryani', 'Paneer / Baby Corn / Mushroom Manchurian', 'Phulka + Veg Gravy', 'Rasgolla / Kova Barfi'],
      img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=85&auto=format&fit=crop',
    },
  ],
}
