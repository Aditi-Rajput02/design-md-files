const ITEMS = [
  'Fine Jewellery', 'Handcrafted Gold', 'Rare Gemstones', 'Bespoke Design',
  'Diamond Rings', 'Platinum Necklaces', 'Artisan Crafted', 'Ethically Sourced',
  'Fine Jewellery', 'Handcrafted Gold', 'Rare Gemstones', 'Bespoke Design',
  'Diamond Rings', 'Platinum Necklaces', 'Artisan Crafted', 'Ethically Sourced',
]

export default function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
