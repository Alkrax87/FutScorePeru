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
      },
      fixture: {
        "apertura": {
          "matches": [
            [
              {
                "home": "L1Team13",
                "away": "L1Team19"
              }
            ],
            [
              {
                "home": "L1Team11",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team2"
              }
            ],
            [
              {
                "home": "L1Team14",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team17"
              }
            ],
            [
              {
                "home": "L1Team6",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team1"
              }
            ],
            [
              {
                "home": "L1Team18",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team12"
              }
            ],
            [
              {
                "home": "L1Team8",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team10"
              }
            ],
            [
              {
                "home": "L1Team9",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team5"
              }
            ],
            [
              {
                "home": "L1Team4",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team15"
              }
            ],
            [
              {
                "home": "L1Team16",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team3"
              }
            ],
            [
              {
                "home": "L1Team7",
                "away": "L1Team13"
              }
            ]
          ]
        },
        "clausura": {
          "matches": [
            [
              {
                "home": "L1Team19",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team11"
              }
            ],
            [
              {
                "home": "L1Team2",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team14"
              }
            ],
            [
              {
                "home": "L1Team17",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team6"
              }
            ],
            [
              {
                "home": "L1Team1",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team18"
              }
            ],
            [
              {
                "home": "L1Team12",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team8"
              }
            ],
            [
              {
                "home": "L1Team10",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team9"
              }
            ],
            [
              {
                "home": "L1Team5",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team4"
              }
            ],
            [
              {
                "home": "L1Team15",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team16"
              }
            ],
            [
              {
                "home": "L1Team3",
                "away": "L1Team13"
              }
            ],
            [
              {
                "home": "L1Team13",
                "away": "L1Team7"
              }
            ]
          ]
        }
      },
      lastGames: {
        "apertura": [
          "w",
          "w",
          "w",
          "w",
          "w",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "clausura": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      },
      results: {
        "apertura": [
          3,
          1,
          2,
          null,
          1,
          3,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "clausura": [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ]
      },
      performance: [
        { data: 'Puntos', value: 15 },
        { data: 'Ganados', value: 5 },
        { data: 'Empatados', value: 0 },
        { data: 'Perdidos', value: 0 },
        { data: 'GF', value: 10 },
        { data: 'GC', value: 3 },
      ]
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
