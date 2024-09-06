import { Component, HostListener, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit {
  @ViewChild('counterSection', { static: true }) counterSection!: ElementRef;

  showNewContent: boolean = false;

  experienceCount: number = 0;
  experienceTarget: number = 10; // Replace this with the years of experience
  experienceDuration: number = 1000; // in milliseconds
  
  clientsCount: number = 0;
  clientsTarget: number = 150; // Replace this with the number of clients
  clientsDuration: number = 1000; // in milliseconds

  private hasStartedCounting: boolean = false;

  ngAfterViewInit(): void {
    this.observeCounterSection();
  }

  observeCounterSection() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasStartedCounting) {
          this.hasStartedCounting = true;
          this.animateCounter('experience');
          this.animateCounter('clients');
          observer.disconnect(); // Stop observing once the counters start
        }
      });
    });

    observer.observe(this.counterSection.nativeElement); // Observe the section with the counters
  }

  animateCounter(type: 'experience' | 'clients') {
    const startTime = performance.now();
    const duration = type === 'experience' ? this.experienceDuration : this.clientsDuration;
    const target = type === 'experience' ? this.experienceTarget : this.clientsTarget;
    const endTime = startTime + duration;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      if (type === 'experience') {
        this.experienceCount = Math.round(target * progress);
      } else {
        this.clientsCount = Math.round(target * progress);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
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
}
