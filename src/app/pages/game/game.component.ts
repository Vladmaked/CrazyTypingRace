import {Component, HostListener, Injectable, OnInit} from '@angular/core';
import {HtmlService} from '../../html.service';
import {FirstPageComponent} from '../first-page/first-page.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class GameComponent implements OnInit {
  text = this.htmlService.textOnService;
  indexLetter = 0;
  indexSpan = 0;
  letters = [{
    symbol: this.text.split(''),
    display: false,
    correct: false
  }];
  typedLetter: string;
  start;
  finish;
  timeOfThisLatter;
  timeOfLastLatter: number;
  speedCar = 7;
  speedOpponent = 5;
  positionCar = 0;
  positionOpponent = 0;
  backgroundObjects = [
    {
      id: document.getElementById('mountains0'),
      position: 0,
      distance: 100
    },
    {
      id: document.getElementById('mountains1'),
      position: 0,
      distance: 100
    },
    {
      id: document.getElementById('treeContainer0'),
      position: 0,
      distance: 3
    },
    {
      id: document.getElementById('treeContainer1'),
      position: 0,
      distance: 3
    },
    {
      id: document.getElementById('grassContainer0'),
      position: 0,
      distance: 1
    },
    {
      id: document.getElementById('grassContainer1'),
      position: 0,
      distance: 1
    }
  ];
  positionMountains = 0;
  arrayOfPositionByTree = [0, 0, 0, 0, 0, 0, 0];
  arrayOfPositionByGrass = [];
  arrayOfGrassIds = [];

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.typedLetter = event.key;
    this.checkLetter();
  }

  constructor(private htmlService: HtmlService, private firstPage: FirstPageComponent) {
  }

  ngOnInit() {
    for (let i = 0; i < this.letters[0].symbol.length; i++) {
      const child = document.createElement('span');
      child.innerText = this.letters[0].symbol[i];
      document.getElementById('textZone').appendChild(child);
      child.setAttribute('id', String(i));
      child.setAttribute('class', 'text');
    }
    this.start = Date.now();
    this.timeOfLastLatter = this.start;
    for (let i = 0; i < 8; i++) {
      this.arrayOfGrassIds[i] = i;
      this.arrayOfPositionByGrass[i] = 0;
    }

    document.getElementById('mountains1').style.left = `${screen.width}`;
    document.getElementById('treeContainer1').style.left = `${screen.width}`;
    document.getElementById('grassContainer1').style.left = `${screen.width}`;

  }

  checkLetter() {
    const span = document.getElementById(String(this.indexSpan));
    if ( this.letters[0].symbol[this.indexLetter] === this.typedLetter ) {
      this.timeOfThisLatter = Date.now();
      if (this.indexLetter === this.letters[0].symbol.length - 1) {
        this.finish = this.timeOfThisLatter;
      }
      this.speedCar = 1000 / (this.timeOfThisLatter - this.timeOfLastLatter);
      this.timeOfLastLatter = this.timeOfThisLatter;
      this.letters[0].correct = true;
      this.indexLetter ++;
      this.indexSpan ++;
      span.style.backgroundColor = '#67ff65';
      this.move();
    } else {
      span.style.backgroundColor = '#8a0505';
    }
  }

//  . . . . .()

  move() {
    this.checkPosition();
    if (this.finish || this.indexLetter === 0) {
      this.speedCar -= 0.1;
      if (this.speedCar < 0) {
        this.speedCar = 0;
        this.speedOpponent = 0;
      }
    }
    this.transformOfBlocks();
    requestAnimationFrame(() => this.move());
  }

  moveTree(i: number, position: number) {
    const tree = document.getElementById('tree' + i);
    tree.style.transform = `translateX(${ Math.round(position) }px)`;
    const MAX_POSITION = 200 * (i + 1);
    if ( position < -MAX_POSITION ) {
      this.arrayOfPositionByTree[i] = screen.width;
      tree.style.left = -200 + 'px';
    } else {
      const speed = Math.round(this.speedCar / 20);
      this.arrayOfPositionByTree[i] -= speed;
    }
  }

  moveGrass(i: number, position: number) {
    const grass = document.getElementById('grass' + i);
    grass.style.transform = `translateX(${ position }px)`;
    const MAX_POSITION = 300 * (i + 1);
    if ( position < -MAX_POSITION ) {
      this.arrayOfPositionByGrass[i] = screen.width;
      grass.style.left = -120 + 'px';
    } else {
      const speed = Math.round(this.speedCar / 10);
      this.arrayOfPositionByGrass[i] -= speed;
    }
  }

  moveMountains() {
    const mountain = document.getElementById('mountains');
    mountain.style.transform = `translateX(${ this.positionMountains }px)`;
    const MAX_POSITION = screen.width;
    if ( this.positionMountains < -MAX_POSITION ) {
      this.positionMountains = screen.width;
      mountain.style.left = -100 + 'px';
    } else {
      const speed = Math.round(this.speedCar / 300);
      this.positionMountains -= speed;
    }
  }

  checkPosition() {
    const MAX_POSITION = screen.width / 3;
    const speed = this.speedCar; // this may contain const for animation (now remove it)
    this.speedOpponent = Math.random() * 5 + 5;
    if (this.positionCar > MAX_POSITION) {
      // this.moveMountains();
      // for (let index = 0; index < this.arrayOfGrassIds.length; index++) {
      //   this.moveGrass(index, this.arrayOfPositionByGrass[index]);
      // }
      // for (let index = 0; index < 7; index++) {
      //   this.moveTree(index, this.arrayOfPositionByTree[index]);
      // }
      this.positionOpponent += this.speedOpponent - speed;
    } else {
      this.positionCar += speed;
      this.positionOpponent += this.speedOpponent;
    }
  }

  transformOfBlocks() {
    this.backgroundObjects.forEach((object) => {
      object.id.style.left = `${object.position}`;
    });
    document.getElementById('car').style.transform = `translateX(${ Math.round(this.positionCar) }px)`;
    document.getElementById('carOpponent').style.transform = `translateX(${ Math.round(this.positionOpponent) }px)`;
  }

}
