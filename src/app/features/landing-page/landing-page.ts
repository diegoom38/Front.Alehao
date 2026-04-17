import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { Footer } from "../../shared/components/footer/footer";
import { Header } from "../../shared/components/header/header";

@Component({
  selector: 'app-landing-page',
  imports: [ButtonComponent, RouterLink, Footer, Header],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  

}
