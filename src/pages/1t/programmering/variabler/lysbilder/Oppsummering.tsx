import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Variabler</span>
          <Kode>{'x = 5\nx = x + 1'}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>
              <code>=</code> betyr «regn ut høyre side og lagre svaret i variabelen til venstre».
            </li>
            <li>En variabel husker en verdi, ikke et regnestykke.</li>
            <li>Navn: bokstaver, tall og understrek, ikke tall først. Store og små bokstaver er forskjellige.</li>
          </ul>
        </div>
        <div className="panel small">
          <b>Typer:</b> heltall <code>int</code>, desimaltall <code>float</code> og tekst <code>str</code>. Gjør om med{' '}
          <code>int( )</code>, <code>float( )</code> og <code>str( )</code>.
        </div>
      </div>
      <div className="stack">
        <div className="boxed">
          <span className="label">Inn og ut</span>
          <Kode>{"r = float(input('Radius: '))\nareal = 3.14 * r**2\nprint(f'Arealet er {round(areal, 2)}')"}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>
              <code>input( )</code> gir alltid tekst.
            </li>
            <li>
              I en f-streng skrives verdier inn mellom <code>{'{ }'}</code>.
            </li>
            <li>
              <code>round(x, 2)</code> runder av til to desimaler.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
