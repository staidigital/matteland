import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Konsoll } from '../../../../../presentasjon/python/Konsoll';

const ORD: [string, string, string][] = [
  ['and', 'begge må være sanne', 'n > 0 and n % 2 == 0'],
  ['or', 'minst én må være sann', 'n % 3 == 0 or n % 5 == 0'],
  ['not', 'snur sant og usant', 'not n % 2 == 0'],
];

export const AndOr: React.FC = () => (
  <div className="slide">
    <div className="kicker">and, or og not</div>
    <h2>Flere vilkår på én gang</h2>
    <div className="cols">
      <div className="stack">
        <div className="tablewrap">
          <table className="cases">
            <tbody>
              {ORD.map(([o, betyr, eks]) => (
                <tr key={o}>
                  <td>
                    <Kode inline>{o}</Kode>
                  </td>
                  <td>{betyr}</td>
                  <td>
                    <Kode inline>{eks}</Kode>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <p className="small">Et tall mellom 1 og 10 kan skrives på to måter. Begge er riktige:</p>
          <Kode>{'if x >= 1 and x <= 10:\nif 1 <= x <= 10:'}</Kode>
        </div>
        <p className="hintline">
          Hvert vilkår må skrives helt ut. <code>x == 1 or x == 2</code> er riktig, <code>x == 1 or 2</code> er ikke det.
        </p>
      </div>
      <div className="stack">
        <Konsoll forslag={['n = 12', 'n > 0 and n % 2 == 0', 'n % 5 == 0 or n % 3 == 0', 'not n > 10', '1 <= n <= 10']} />
        <p className="hintline">Endre n og prøv de samme linjene igjen. Bruk pil opp for å hente fram tidligere linjer.</p>
      </div>
    </div>
  </div>
);
