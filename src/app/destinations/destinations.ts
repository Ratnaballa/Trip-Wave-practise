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
  electedCategory = 'all';
  selectedRating = 0;
  maxPrice = 100000;
  searchText = '';
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
  rating: 4,
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
    price: 87000
},
{
  name: 'Paris',
  description: 'Luxury destination with crystal lights.',
  image: 'assets/paris.jpg',
  category: 'international',
  rating: 4,
    price: 76000
},
{
  name: 'Switzerland',
  description: 'Luxury destination with spiritual city.',
  image: 'assets/swi.jpg',
  category: 'international',
  rating: 2,
    price: 68000
}

  ];
selectedCategory = 'all';
  get filteredDestinations() {
    return this.destinations.filter(d => {

      const matchCategory =
        this.selectedCategory === 'all' ||
        d.category === this.selectedCategory;

      const matchRating =
        this.selectedRating === 0 ||
        d.rating >= this.selectedRating;

      const matchPrice =
        d.price <= this.maxPrice;

      const matchSearch =
        d.name.toLowerCase().includes(this.searchText.toLowerCase());

      return matchCategory && matchRating && matchPrice && matchSearch;

    });
  }
}