import React from 'react';
import { Vekt } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Basics</div>
    <h1>Førstegradslikninger</h1>
    <p className="lede">Finne det ukjente tallet ved å gjøre det samme på begge sider.</p>
    <div className="cols wide-left">
      <Vekt venstre={{ x: 2, ener: 3 }} hoyre={{ x: 0, ener: 9 }} beskrivelse="Skålvekt i likevekt med to x-klosser og tre lodd på venstre side og ni lodd på høyre side" />
      <div className="stack">
        <p>Vekta er i likevekt. Hvor mye veier hver av de blå klossene?</p>
        <p>Du løste nettopp en likning. Nå skal vi gjøre den samme tankegangen til en metode som også virker når svaret ikke er lett å se.</p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
