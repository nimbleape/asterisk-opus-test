import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import * as s from './sounds'
import * as howler from 'howler'
import * as JsSIP from 'jssip'

window.howler = howler;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

let sounds = s.sounds;

let sound = sounds.background.reno;
sound.howl = new howler.Howl({
  src: [sound.path],
  pool: 100,
  autoplay: true,
  loop: true,
  volume: 1
});

const configuration = {
  'ws_servers': 'ws<secure?>://<asterisk-ip-or-url>/ws',
  'uri': 'sip:<username>@<asterisk-ip-or-url>',
  'username': '<username>',
  'password': '<password>'
};
 
let ua = new JsSIP.UA(configuration);
 
ua.start();

let dest = howler.Howler.ctx.createMediaStreamDestination();//create a new destination node
howler.Howler.masterGain.connect(dest);

document.getElementById("makeCall").addEventListener("click", function(){

  ua.call('<ext>@<asterisk-ip-or-url>', {
    mediaStream: dest.stream
  });
});
