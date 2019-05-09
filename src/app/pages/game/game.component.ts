import {Component, ElementRef, HostListener, Injectable, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HtmlService} from '../../html.service';
import {element} from 'protractor';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class GameComponent implements OnInit {
  @ViewChild('car')
  car: ElementRef;

  @ViewChild('carOpponent')
  carOpponent: ElementRef;

  @ViewChild('mountains0')
  mountains0: ElementRef;

  @ViewChild('mountains1')
  mountains1: ElementRef;

  @ViewChild('treeContainer0')
  treeContainer0: ElementRef;

  @ViewChild('treeContainer1')
  treeContainer1: ElementRef;

  @ViewChild('grassContainer0')
  grassContainer0: ElementRef;

  @ViewChild('grassContainer1')
  grassContainer1: ElementRef;

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
  timeOfThisLatter: number;
  timeOfLastLatter: number;
  speedCar = 7;
  speedOpponent = 5;
  positionCar = 0;
  positionOpponent = 0;
  backgroundObjects;
  arrayOfGrassIds = [];

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.typedLetter = event.key;
    this.checkLetter();
  }

  constructor(private htmlService: HtmlService, private render: Renderer2) {
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
    }
    this.backgroundObjects = [
      {
        id: this.mountains0,
        renderPosition: 0,
        distance: 100
      },
      {
        id: this.mountains1,
        renderPosition: screen.width,
        distance: 100
      },
      {
        id: this.treeContainer0,
        renderPosition: 1,
        distance: 5
      },
      {
        id: this.treeContainer1,
        renderPosition: screen.width,
        distance: 5
      },
      {
        id: this.grassContainer0,
        renderPosition: 1,
        distance: 1
      },
      {
        id: this.grassContainer1,
        renderPosition: screen.width,
        distance: 1
      }
    ];
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
      span.style.backgroundColor = '#0c5f0b';
      this.move();
    } else {
      span.style.backgroundColor = '#7f3535';
    }
  }

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

  checkPosition() {
    const MAX_POSITION = screen.width / 3;
    const speed = this.speedCar; // this may contain const for animation (now remove it)
    this.speedOpponent = Math.random() * 5 + 5;
    if (this.positionCar > MAX_POSITION) {
      this.backgroundObjects.forEach((object) => {
        object.renderPosition -= speed / object.distance;
        if (object.renderPosition < -screen.width) {
          object.renderPosition += screen.width * 2;
        }
      });
      this.positionOpponent += this.speedOpponent - speed;
    } else {
      this.positionCar += speed;
      this.positionOpponent += this.speedOpponent;
    }
  }

  transformOfBlocks() {
    this.backgroundObjects.forEach((object) => {
      object.id.nativeElement.style.left = Math.round(object.renderPosition) + 'px';
    });
    console.log('car :   ' + this.positionCar + '\n' + 'opponent:  ' + this.positionOpponent);
    const position = Math.round(this.positionCar);
    document.getElementById('car').style.left = position + 'px';
    document.getElementById('carOpponent').style.left = Math.round(this.positionOpponent) + 'px';
  }

}
