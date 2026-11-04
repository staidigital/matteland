import React from 'react';
import { Mengdediagram } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Basics</div>
    <h1>Tallmengder</h1>
    <p className="lede">Hva slags tall finnes, og hvordan skriver vi hvilke tall vi snakker om?</p>
    <div className="cols wide-left">
      <Mengdediagram />
      <div className="stack">
        <p>
          Tall deles inn i mengder som ligger inni hverandre. Alle naturlige tall er hele tall, alle hele tall er rasjonale,
          og alle rasjonale tall er reelle.
        </p>
        <p>Et intervall er en annen måte å samle tall på: alle tallene mellom to grenser.</p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
