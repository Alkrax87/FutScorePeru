import { Component } from '@angular/core';
import { TitleComponent } from '../../../components/title/title.component';
import { TeamCardCp } from '../../../interfaces/ui-models/team-card-cp';
import { TeamCardCpComponent } from '../../../components/team-card-cp/team-card-cp.component';

@Component({
  selector: 'app-cp-teams',
  imports: [TitleComponent, TeamCardCpComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night p-5">
      <div class="w-full">
        <div class="flex justify-center">
          <div class="w-full lg:w-11/12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            @for (item of dataTeams; track $index) {
              <app-team-card-cp [data]="dataTeams[$index]"></app-team-card-cp>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CpTeamsComponent {
  dataTeams: TeamCardCp[] = [
    {
      region: "Áncash",
      flag: "assets/images/copa-peru/flags/ancash-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Amazonas",
      flag: "assets/images/copa-peru/flags/amazonas-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Apurímac",
      flag: "assets/images/copa-peru/flags/apurimac-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Arequipa",
      flag: "assets/images/copa-peru/flags/arequipa-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Ayacucho",
      flag: "assets/images/copa-peru/flags/ayacucho-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Cajamarca",
      flag: "assets/images/copa-peru/flags/cajamarca-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Callao",
      flag: "assets/images/copa-peru/flags/callao-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Cusco",
      flag: "assets/images/copa-peru/flags/cusco-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Huánuco",
      flag: "assets/images/copa-peru/flags/huanuco-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Huancavelica",
      flag: "assets/images/copa-peru/flags/huancavelica-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Ica",
      flag: "assets/images/copa-peru/flags/ica-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Junín",
      flag: "assets/images/copa-peru/flags/junin-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Loreto",
      flag: "assets/images/copa-peru/flags/loreto-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "La Libertad",
      flag: "assets/images/copa-peru/flags/la_libertad-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Lambayeque",
      flag: "assets/images/copa-peru/flags/lambayeque-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Lima",
      flag: "assets/images/copa-peru/flags/lima-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Madre de Dios",
      flag: "assets/images/copa-peru/flags/madre_de_dios-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Moquegua",
      flag: "assets/images/copa-peru/flags/moquegua-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Pasco",
      flag: "assets/images/copa-peru/flags/pasco-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Piura",
      flag: "assets/images/copa-peru/flags/piura-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Puno",
      flag: "assets/images/copa-peru/flags/puno-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "San Martín",
      flag: "assets/images/copa-peru/flags/san_martin-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir3",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Tacna",
      flag: "assets/images/copa-peru/flags/tacna-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Tumbes",
      flag: "assets/images/copa-peru/flags/tumbes-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
    {
      region: "Ucayali",
      flag: "assets/images/copa-peru/flags/ancash-logo.webp",
      color: {
        c1: "#fff"
      },
      teams: [
        {
          name: "Por Definir1",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        },
        {
          name: "Por Definir2",
          image: "assets/images/pages/no-team.webp",
          alt: "",
          city: ""
        }
      ]
    },
  ];
}