import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeamCard } from '../../interfaces/ui-models/team-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.css',
})
export class TeamCardComponent {
  @Input() data?: TeamCard;
  isHovered: boolean = false;
  Ring = faRing;
  Users = faUsers;
  LocationDot = faLocationDot;
}
