import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DESTINATIONS } from '../destinations-data';
@Component({
  selector: 'app-explore',
  imports: [CommonModule],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore {
  destinationId: number = 0;
  destination: any;
  mapUrl: any;
  constructor(
  private route: ActivatedRoute,
  private sanitizer: DomSanitizer
) {}
  destinations = DESTINATIONS;
  ngOnInit(){
    this.destinationId = Number(this.route.snapshot.paramMap.get('id'));
    this.destination = this.destinations.find(
      d => d.id === this.destinationId
    );
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps?q=' +
    this.destination.lat +
    ',' +
    this.destination.lng +
    '&output=embed'
  );
  }
}