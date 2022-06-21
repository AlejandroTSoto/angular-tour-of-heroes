import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {

  @Input()
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  @Input()
  image?: String;

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.getImage();
      });
  }

  getImage(): void {
    this.heroService.getImage(this.hero!)
    .subscribe((json:any) => {
      let urlImage = json.data.results[0].thumbnail.path+"."+json.data.results[0].thumbnail.extension;
      this.image = urlImage.replace('http','https');
    })
  }

  addPower(): void {
    const poder = document.getElementById('hero-power') as HTMLInputElement;
    this.hero?.power.push(poder.value);
    poder.value = '';
  }

  deletePower(name: string): void {
    this.hero?.power.forEach((item,index) => {
      if(item == name) {
        this.hero?.power.splice(index,1);
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
