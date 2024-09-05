import { Component, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit {
  showNewContent: boolean = false;

  
  ngAfterViewInit(): void {
    this.checkVisibility();
    window.addEventListener('scroll', this.checkVisibility.bind(this));
  }
  

  @HostListener('window:scroll', ['$event'])
  checkVisibility() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const viewportHeight = window.innerHeight;

    fadeInElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
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

  handleImageClick() {
    this.showNewContent = !this.showNewContent; // Toggle visibility
}



}
