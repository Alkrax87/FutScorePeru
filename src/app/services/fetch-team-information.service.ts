import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamInformationService {
  constructor() {}

  // Preliminar Service to test the Team Page

  fetchTeamInformation() {
    return {
      division: 'Liga 1',
      name: 'FBC Melgar',
      image: 'assets/images/liga-1/mel.webp',
      alt: 'MEL-logo',
      location: 'Arequipa',
      foundation: 1915,
      background: 'https://imgmedia.libero.pe/600x330/libero/original/2025/01/14/67869952dc93420f8f5fe169.webp',
      website: 'https://fbcmelgar.com.pe/',
      social: {
        facebook: 'https://www.facebook.com/FBCMelgar',
        instagram: 'https://www.instagram.com/fbcmelgar',
        twitter: 'https://x.com/MelgarOficial',
        youtube: 'https://www.youtube.com/@ClubFBCMelgar',
        tiktok: 'https://www.tiktok.com/@fbcmelgar',
      },
      stadium: {
        name: 'Monumental de la UNSA',
        capacity: 60000,
        location: 'Arequipa',
        image: 'https://pbs.twimg.com/media/EsQkcj5WMAEf5XN.jpg',
      }
    };
  }

  fetchTeamLastGames() {
    return ["l","w","d","w","w","w","","","","","","","","","","","","",""];
  }

  fetchTeamStatistics() {
    return [
      { data: 'Puntos', value: 20 },
      { data: 'Ganados', value: 6 },
      { data: 'Empatados', value: 2 },
      { data: 'Perdidos', value: 2 },
      { data: 'GF', value: 15 },
      { data: 'GC', value: 8 },
    ]
  }
}
