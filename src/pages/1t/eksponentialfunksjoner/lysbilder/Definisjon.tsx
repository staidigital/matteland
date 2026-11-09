import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { V, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { EkspGen, eksp } from '../felles';

const A = 2;
const XS = [0, 1, 2, 3, 4];

export const DEF_STEG = 2;

export const Definisjon: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksponentialfunksjoner</div>
    <h2>Konstanten a og definisjonen</h2>
    <div className="cols">
      <div className="stack">
        <div className="panel">
          Hvor skjærer grafen y-aksen? Vi regner ut <span className="math nw"><Fx x="0" /></span>:
          <p className="math">
            <Fx x="0" /> = <V c="a" /> · <V c="b" />
            <sup>0</sup> = <V c="a" /> · 1 = <b className="c2">a</b>
          </p>
          <p className="small muted">
            Grafen går gjennom (0 , <V c="a" />). Siden <V c="a" /> &gt; 0, kan den aldri gå gjennom origo.
          </p>
        </div>
        {frag >= 1 && (
          <div className="boxed reveal">
            <span className="label">Eksponentialfunksjon</span>
            <span className="math">
              <Fx /> = <EkspGen farge />, &nbsp;der <V c="a" /> &gt; 0 og <V c="b" /> &gt; 0
            </span>
            <span className="mline">
              <b className="c2">a</b> er skjæringen med y-aksen.
            </span>
            <span className="mline">
              <b className="c1">b</b> er grunntallet og vekstfaktoren.
            </span>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={DEF_STEG} />
      </div>
      <div className="stack">
        {frag < 2 ? (
          <FunkGraf
            kurver={[
              { f: eksp(A, 1.6), farge: 'c1' },
              { f: eksp(A, 0.6), farge: 'c2' },
            ]}
            punkter={[{ x: 0, y: A, farge: 'pen', navn: 'a', plass: 'venstre' }]}
            ekstra={(s) => (
              <>
                <text className="g-txt" x={s.sx(1.3)} y={s.sy(7.2)} style={{ fill: 'var(--r1)' }}>
                  b større enn 1
                </text>
                <text className="g-txt" x={s.sx(-3.9)} y={s.sy(7.2)} style={{ fill: 'var(--r2)' }}>
                  b mellom 0 og 1
                </text>
              </>
            )}
            xmin={-4}
            xmax={4}
            ymin={-1}
            ymax={8}
            h={400}
            title="Eksponentialfunksjoner med b større enn 1 og b mellom 0 og 1 skjærer y-aksen i a"
          />
        ) : (
          <div className="panel stack reveal" style={{ gap: 12 }}>
            <h3>Like mange prosent i hver periode</h3>
            <div className="tablewrap">
              <table className="vt">
                <tbody>
                  <tr>
                    <th>
                      <X />
                    </th>
                    {XS.map((x) => (
                      <td key={x}>{x}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>3 + 2<X /></th>
                    {XS.map((x) => (
                      <td key={x}>{3 + 2 * x}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>
                      3 · 2<sup><X /></sup>
                    </th>
                    {XS.map((x) => (
                      <td key={x} className="on">
                        {3 * 2 ** x}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              En <b>lineær</b> funksjon <i>legger til</i> det samme tallet hver gang (+2).
            </p>
            <p>
              En <b>eksponentialfunksjon</b> <i>ganger</i> med det samme tallet hver gang (·2). Det betyr at den vokser
              eller avtar med like mange prosent i hver periode.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
