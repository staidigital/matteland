import React from 'react';
import { ABC, Gen, V, X } from '../../../../presentasjon/matte';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed math big"><ABC /></div>
    <div className="cols">
      <ol className="steps">
        <li><span className="no">1</span><div>Skriv likningen på formen <span className="math nw"><Gen /> = 0</span>.</div></li>
        <li><span className="no">2</span><div>Finn <V c="a" />, <V c="b" /> og <V c="c" /> med fortegn.</div></li>
        <li><span className="no">3</span><div>Sett inn, med parentes rundt negative tall.</div></li>
        <li><span className="no">4</span><div>Regn ut, og skriv begge løsningene. Kontroller gjerne.</div></li>
      </ol>
      <div className="tablewrap">
        <table className="cases">
          <thead><tr><th>Diskriminant</th><th>Antall løsninger</th><th>Grafen krysser <X />-aksen</th></tr></thead>
          <tbody>
            <tr><td className="math"><V c="D" /> &gt; 0</td><td>to</td><td>to steder</td></tr>
            <tr><td className="math"><V c="D" /> = 0</td><td>én</td><td>ett sted (berører)</td></tr>
            <tr><td className="math"><V c="D" /> &lt; 0</td><td>ingen</td><td>ingen steder</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
