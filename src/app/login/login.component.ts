import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientServiceService } from '../ApiServices/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string | null = null; // Property to hold error message

  constructor(
    private router: Router,
    private clientService: ClientServiceService,
    private fb: FormBuilder
  ) {
    // Initialize form with validators
    this.loginForm = this.fb.group({
      clientId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {
    localStorage.clear();
  }
  
  redirectTo(route: string) {
    this.router.navigate([route]);
  }


  onMouseMove(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    if (target) {
      const container = target.closest('.parallax-container') as HTMLElement;
      const image = container.querySelector('.parallax-image') as HTMLElement;

      // Get container dimensions and mouse position
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const mouseX = event.clientX - container.getBoundingClientRect().left; // Adjust mouse position relative to the container
      const mouseY = event.clientY - container.getBoundingClientRect().top; // Adjust mouse position relative to the container

      // Calculate the range for the effect
      const horizontalRange = containerWidth * 0.2; // 20% of container width for horizontal effect
      const verticalRange = containerHeight * 0.2; // 20% of container height for vertical effect

      // Calculate horizontal and vertical percentage movement
      const percentageX = ((mouseX / containerWidth) - 0.5) * 2; // Range [-1, 1]
      const percentageY = ((mouseY / containerHeight) - 0.5) * 2; // Range [-1, 1]

      // Move the image based on mouse position
      const translateX = percentageX * horizontalRange * 0.5; // Adjust multiplier for horizontal movement
      const translateY = percentageY * verticalRange * 0.5; // Adjust multiplier for vertical movement

      image.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { clientId, password } = this.loginForm.value;
      this.clientService.login(clientId, password).subscribe({
        next: (response) => {
          this.clientService.getClientProfile(clientId).subscribe({
            next: (clientProfile) => {
              // Store the entire client object in local storage
              localStorage.setItem('client', JSON.stringify(clientProfile));
              this.redirectTo('/dashboard');
            },
            error: (error) => {
              this.errorMessage = 'Unable to fetch client profile'; // Handle profile fetch error
            }
          });
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Mot de passe incorrect';
          } else if (error.status === 404) {
            this.errorMessage = "L'identifiant du client n'existe pas";
          } else {
            this.errorMessage = 'Une erreur inattendue est survenue';
          }
        }
      });
  
    }
  }


}