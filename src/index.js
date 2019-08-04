'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import addDots from './modules/dots';
import slider from './modules/slider';
import dataImg from './modules/dataImg';
import validNumber from './modules/validNumber';
import calc from './modules/calc';
import validNamePhone from './modules/validNamePhone';
import sendForm from './modules/sendForm';
// timer
countTimer('05 august 2019');
// menu
toggleMenu();
// popup
togglePopUp();
// tabs
tabs();
// dots add
addDots();
// slider
slider();
// data-img
dataImg();
// validate - calc
validNumber();
// calculator
calc(100);
// ваалидация телефона
validNamePhone();
// send AJAX form
sendForm();