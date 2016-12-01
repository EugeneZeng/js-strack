import 'babel-polyfill';
import Dog from './shared/Dog';

const bowserToby = new Dog('Toby');

document.querySelector('.app').innerText = bowserToby.bark();