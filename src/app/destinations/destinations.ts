import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-destinations',
  imports: [CommonModule,FormsModule],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css',
})
export class Destinations {
  visibleCount = 8;
  selectedCategory = 'all';
  selectedRating = 0;
  maxPrice = 100000;
  searchText = '';
  resetFilters() {
  this.selectedCategory = 'all';
  this.selectedRating = 0;
  this.maxPrice = 100000;
  this.searchText = '';
}
  destinations = [
    {
      name: 'Goa',
      description: 'Famous for beaches, nightlife and water sports.',
      image: 'assets/goa.jpg',
      category: 'india',
      rating: 5,
    price: 15000
    },
    {
      name: 'Manali',
      description: 'A beautiful hill station surrounded by mountains.',
      image: 'assets/jaipur.jpg',
      category: 'international',
      rating: 4,
    price: 65000

    },
    {
  name: 'Ooty',
  description: 'Queen of hill stations with tea gardens and cool climate.',
  image: 'assets/ooty.jpg',
  category: 'india',
  rating: 5,
    price: 75000
},
{
  name: 'Mysore',
  description: 'Famous for its royal palace and cultural heritage.',
  image: 'assets/mysore.jpg',
  category: 'india',
  rating: 4,
    price: 18000
},
{
  name: 'Hyderabad',
  description: 'City of pearls known for Charminar and biryani.',
  image: 'assets/hyd.jpg',
  category: 'india',
  rating: 3,
    price: 5000
},
{
  name: 'Rishikesh',
  description: 'Yoga capital of the world with river rafting.',
  image: 'assets/ris.jpg',
  category: 'india',
  rating: 2,
    price: 45000
},
{
  name: 'Shimla',
  description: 'Beautiful hill station with snow and colonial charm.',
  image: 'assets/simla.jpg',
  category: 'india',
  rating: 2,
    price: 45000
},
{
  name: 'Udaipur',
  description: 'City of lakes with stunning royal palaces.',
  image: 'assets/udai.jpg',
  category: 'india',
  rating: 2,
    price: 54000
},
{
  name: 'Andaman',
  description: 'Crystal clear waters and peaceful island vibes.',
  image: 'assets/andaman.jpg',
  rating: 5,
    price: 76000
},
{
  name: 'Coorg',
  description: 'Coffee plantations and misty mountain views.',
  image: 'assets/coorg.jpg',
  rating: 4,
    price: 15000
},
{
  name: 'Varanasi',
  description: 'Spiritual city with ancient ghats on the Ganga.',
  image: 'assets/kasi.jpg',
  category: 'india',
  rating: 3,
    price: 12000
},
{
  name: 'Dubai',
  description: 'Adventure paradise with breathtaking landscapes.',
  image: 'assets/dubai.jpg',
  category: 'international',
  rating: 4,
    price: 68000
},
{
  name: 'Maldives',
  description: 'Luxury island destination with crystal clear waters.',
  image: 'assets/maldives.jpg',
  category: 'international',
  rating: 3,
    price: 27000
},
{
  name: 'Paris',
  description: 'Luxury destination with crystal lights.',
  image: 'assets/paris.jpg',
  category: 'international',
  rating: 4,
    price: 36000
},
{
  name: 'Switzerland',
  description: 'Luxury destination with spiritual city.',
  image: 'assets/swi.jpg',
  category: 'international',
  rating: 2,
    price: 68000
},
{
      name: 'Tirupati',
      description: 'Sacred Himalayan temple dedicated to Lord Venkateswara Swamy.',
      image: 'assets/ttd.jpg',
      category: 'india',
      rating: 5,
    price: 1500
    },
    {
  name: 'Kedarnath',
  description: 'Sacred Himalayan temple dedicated to Lord Shiva.',
  image: 'assets/kedarnath.jpg',
  category: 'india',
  rating: 5,
  price: 20000
},
{
  name: 'Pondicherry',
  description: 'French colonial town with beaches and cafes.',
  image: 'assets/pondi cherry.jpg',
  category: 'india',
  rating: 2,
  price: 12000
},
{
  name: 'Agra',
  description: 'Home to the iconic Taj Mahal and Mughal heritage.',
  image: 'assets/agra.jpg',
  category: 'india',
  rating: 5,
  price: 15000
},
{
  name: 'Ayodhya Ram Mandir',
  description: 'Holy birthplace of Lord Rama and spiritual center.',
  image: 'assets/Mandir.jpg',
  category: 'india',
  rating: 5,
  price: 10000
},
{
  name: 'Arunachal Pradesh',
  description: 'Beautiful northeastern state with mountains and monasteries.',
  image: 'assets/arunachalam.jpg',
  category: 'india',
  rating: 2,
  price: 25000
},
{
  name: 'Gateway of India',
  description: 'Historic monument overlooking the Arabian Sea in Mumbai.',
  image: 'assets/Gateway-to-India.jpg',
  category: 'india',
  rating: 3,
  price: 8000
},
{
  name: 'Meenakshi Temple',
  description: 'Famous temple in Madurai known for its colorful towers.',
  image: 'assets/mennaksahi.jpg',
  category: 'india',
  rating: 5,
  price: 9000
},
{
  name: 'Jagannath Temple',
  description: 'Sacred temple in Puri known for the Rath Yatra festival.',
  image: 'assets/jagannath-temple.jpg',
  category: 'india',
  rating: 5,
  price: 11000
},
{
  name: 'Jaipur',
  description: 'Pink City famous for palaces and royal heritage.',
  image: 'assets/jaipur.jpg',
  category: 'india',
  rating: 3,
  price: 16000
},
{
  name: 'Gangtok',
  description: 'Capital of Sikkim with scenic Himalayan views.',
  image: 'assets/gangtok.jpg',
  category: 'india',
  rating: 4,
  price: 22000
},
{
  name: 'Red Fort',
  description: 'Historic Mughal fort in Delhi and UNESCO heritage site.',
  image: 'assets/redfort.jpg',
  category: 'india',
  rating: 4,
  price: 9000
},
{
  name: 'Golden Temple',
  description: 'Spiritual center of Sikhism located in Amritsar.',
  image: 'assets/golden temple.jpg',
  category: 'india',
  rating: 5,
  price: 12000
},
{
  name: 'Hong Kong',
  description: 'Vibrant city known for skyline, shopping and harbor views.',
  image: 'assets/Hong kong.jpg',
  category: 'international',
  rating: 4,
  price: 85000
},
{
  name: 'Tokyo',
  description: 'Modern city with rich culture and technology.',
  image: 'assets/tokyo.jpg',
  category: 'international',
  rating: 3,
  price: 90000
},
{
  name: 'Vietnam',
  description: 'Beautiful country known for landscapes and street food.',
  image: 'assets/vietnam.jpg',
  category: 'international',
  rating: 4,
  price: 70000
},
{
  name: 'Bangkok',
  description: 'Thailand capital famous for temples and nightlife.',
  image: 'assets/bangkok.jpg',
  category: 'international',
  rating: 4,
  price: 65000
},
{
  name: 'Bali',
  description: 'Indonesian island known for beaches and temples.',
  image: 'assets/bali.jpg',
  category: 'international',
  rating: 2,
  price: 75000
},
{
  name: 'Abu Dhabi',
  description: 'Luxury destination with grand mosques and desert safari.',
  image: 'assets/abu dhabi.jpg',
  category: 'international',
  rating: 4,
  price: 80000
},
{
  name: 'Nepal',
  description: 'Famous hill station in known for tea plantations and misty mountains.',
  image: 'assets/munnar.jpg',
  category: 'india',
  rating: 3,
  price: 15000
},
{
  name: 'Singapore',
  description: 'Modern city-state known for gardens and skyline.',
  image: 'assets/sing.jpg',
  category: 'international',
  rating: 5,
  price: 88000
},
{
  name: 'Munnar',
  description: 'Famous hill station in Kerala known for tea plantations and misty mountains.',
  image: 'assets/munnar.jpg',
  category: 'india',
  rating: 4,
  price: 15000
},
{
  name: 'Shillong',
  description: 'Beautiful hill station called the Scotland of the East.',
  image: 'assets/shillong.jpg',
  category: 'india',
  rating: 4,
  price: 18000
},
{
  name: 'Statue of Unity',
  description: 'World’s tallest statue dedicated to Sardar Vallabhbhai Patel.',
  image: 'assets/statue-of-unity.jpg',
  category: 'india',
  rating: 4,
  price: 12000
},
{
  name: 'Katra (Vaishno Devi)',
  description: 'Holy pilgrimage town and base for Vaishno Devi temple trek.',
  image: 'assets/katra.jpg',
  category: 'india',
  rating: 5,
  price: 10000
},
{
  name: 'Aurangabad',
  description: 'Historic city known for Ajanta and Ellora caves.',
  image: 'assets/aurangabad,jpg.jpg',
  category: 'india',
  rating: 4,
  price: 14000
},
{
  name: 'Rajas Seat Coorg',
  description: 'Famous sunset viewpoint surrounded by scenic valleys.',
  image: 'assets/rajas-seat.jpg',
  category: 'india',
  rating: 4,
  price: 16000
},
{
  name: 'Kolkata',
  description: 'Cultural capital of India known for heritage and festivals.',
  image: 'assets/kolkata.jpg',
  category: 'india',
  rating: 4,
  price: 13000
},
{
  name: 'Nubra Valley',
  description: 'Cold desert valley in Ladakh famous for sand dunes and monasteries.',
  image: 'assets/Nubra Valley.jpg',
  category: 'india',
  rating: 5,
  price: 25000
},
{
  name: 'Sahara desert',
  description: 'Desert valley in Ladakh famous for sand dunes and monasteries.',
  image: 'assets/Nubra Valley.jpg',
  category: 'india',
  rating: 5,
  price: 25000
},
{
  name: 'Dwaraka',
  description: 'Ancient holy city associated with Lord Krishna.',
  image: 'assets/dwaraka.jpg',
  category: 'india',
  rating: 4,
  price: 11000
},
{
  name: 'Rameshwaram',
  description: 'Sacred island town famous for Ramanathaswamy temple.',
  image: 'assets/rameshwaram.jpg',
  category: 'india',
  rating: 4,
  price: 12000
},

{
  name: 'Malaysia',
  description: 'Beautiful Southeast Asian country known for beaches and skyscrapers.',
  image: 'assets/malaysia.jpg',
  category: 'international',
  rating: 4,
  price: 65000
},
{
  name: 'London',
  description: 'Beautiful Southeast European country known for beaches and skyscrapers.',
  image: 'assets/malaysia.jpg',
  category: 'international',
  rating: 4,
  price: 65000
},
{
  name: 'Thailand',
  description: 'Popular travel destination with beaches, temples, and nightlife.',
  image: 'assets/thailand.jpg',
  category: 'international',
  rating: 4,
  price: 55000
},
{
  name: 'Austraila',
  description: 'Popular travel destination with beaches, places, and nightlife.',
  image: 'assets/thailand.jpg',
  category: 'international',
  rating: 4,
  price: 55000
},
{
  name: 'Indonesia',
  description: 'Island nation famous for Bali and tropical landscapes.',
  image: 'assets/indonesia.jpg',
  category: 'international',
  rating: 4,
  price: 60000
},
{
  name: 'Greece',
  description: 'Historic European country known for islands and ancient ruins.',
  image: 'assets/greece.jpg',
  category: 'international',
  rating: 4,
  price: 85000
},
{
  name: 'Canada',
  description: 'Beautiful country with mountains, lakes, and modern cities.',
  image: 'assets/canada.jpg',
  category: 'international',
  rating: 5,
  price: 95000
},
{
  name: 'Italy',
  description: 'Famous for art, architecture, and romantic cities.',
  image: 'assets/italy.jpg',
  category: 'international',
  rating: 5,
  price: 88000
},
{
  name: 'New Zealand',
  description: 'Adventure paradise with stunning mountains and lakes.',
  image: 'assets/new-zealand.jpg',
  category: 'international',
  rating: 5,
  price: 100000
},
{
  name: 'Egypt',
  description: 'Historic land of pyramids, deserts, and ancient civilization.',
  image: 'assets/egypt.jpg',
  category: 'international',
  rating: 4,
  price: 80000
},
{
  name: 'United Kingdom',
  description: 'Historic country known for London, castles, and culture.',
  image: 'assets/uk.jpg',
  category: 'international',
  rating: 4,
  price: 85000
}

  ];
  ngOnInit() {
  this.sortDestinations();
}
sortDestinations() {
  this.destinations.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
get filteredDestinations() {
  return this.destinations.filter(d => {

    const matchCategory =
      this.selectedCategory == 'all' ||
      d.category == this.selectedCategory;

    let matchRating = true;

    if (this.selectedRating == 2) {
      matchRating = d.rating < 3;
    }
    else if (this.selectedRating == 3) {
      matchRating = d.rating >= 3;
    }
    else if (this.selectedRating == 4) {
      matchRating = d.rating >= 4;
    }
    else if (this.selectedRating == 5) {
      matchRating = d.rating == 5;
    }

    const matchPrice =
      d.price <= Number(this.maxPrice);

    const matchSearch =
      d.name.toLowerCase().includes((this.searchText || '').toLowerCase());

    return matchCategory && matchRating && matchPrice && matchSearch;

  });
}
get visibleDestinations() {
  return this.filteredDestinations.slice(0, this.visibleCount);
}
loadMore() {
  this.visibleCount += 8;
}
}