import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const Inndata: React.FC = () => (
  <div className="slide">
    <div className="kicker">input</div>
    <h2>Les inn fra brukeren</h2>
    <div className="cols">
      <div className="stack">
        <p>
          Med <code>input( )</code> stopper programmet og venter på at brukeren skriver noe. Det brukeren skriver, lagrer vi i en
          variabel.
        </p>
        <Kode>{"navn = input('Hva heter du? ')\nprint('Hei,', navn)"}</Kode>
        <div className="boxed">
          <span className="label">Husk</span>
          <p className="small">
            <code>input( )</code> gir alltid <b>tekst</b>. Skal vi regne med svaret, må vi gjøre det om til et tall:
          </p>
          <Kode>{"n = int(input('Antall: '))\nr = float(input('Radius: '))"}</Kode>
        </div>
        <p className="hintline">
          Brukeren må skrive desimaltall med punktum, for eksempel <code>2.5</code>.
        </p>
      </div>
      <div className="stack">
        <Kodeboks
          kode={"r = float(input('Radius: '))\nareal = 3.14 * r**2\nomkrets = 2 * 3.14 * r\nprint('Arealet er', areal)\nprint('Omkretsen er', omkrets)"}
          variabler
        />
        <p className="hintline">
          Kjør og skriv inn en radius. Fjern så <code>float( )</code> og kjør igjen. Hva skjer?
        </p>
      </div>
    </div>
  </div>
);
