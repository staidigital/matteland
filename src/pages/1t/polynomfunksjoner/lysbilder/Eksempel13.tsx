import React from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol, Symmetrilinje, polynom } from '../felles';

const K = [-0.5, 1, 4];
const g = polynom(K);

export const EKS13_STEG = 4;

export const Eksempel13: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 13 · Symmetrilinje</div>
    <h2>Bruk symmetrien til å finne g(2)</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed math big">
          <Fx f="g" />
          <Op>=</Op>
          <Pol k={K} />
        </div>
        {frag >= 1 && (
          <div className="panel reveal">
            <b>a</b> &nbsp;Her er <span className="c2">a = −0,5</span> og <span className="c1">b = 1</span>.
            <p className="math">
              <X /> = −<Frac n="1" d="2 · (−0,5)" /> = −<Frac n="1" d="−1" /> = <b className="pen">1</b>
            </p>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal">
            <b>b</b> &nbsp;
            <span className="math">
              <Fx f="g" x="0" /> = −0,5 · 0<sup>2</sup> + 0 + 4 = 4
            </span>
            . Grafen skjærer y-aksen i 4.
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            <b>c</b> &nbsp;0 og 2 ligger like langt fra symmetrilinja <span className="nw">x = 1</span>, så{' '}
            <span className="math nw">
              <Fx f="g" x="2" /> = <Fx f="g" x="0" /> = <b>4</b>
            </span>
            .
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS13_STEG} />
      </div>
      <div className="stack">
        {frag < 4 ? (
          <FunkGraf
            kurver={[{ f: g }]}
            punkter={[
              ...(frag >= 2 ? [{ x: 0, y: 4, farge: 'c1', navn: '(0 , 4)', plass: 'venstre' as const }] : []),
              ...(frag >= 3 ? [{ x: 2, y: 4, farge: 'c2', navn: '(2 , 4)', plass: 'hoyre' as const }] : []),
            ]}
            ekstra={(s) => (
              <>
                {frag >= 1 && <Symmetrilinje sx={s.sx} H={s.H} p={1} />}
                {frag >= 3 && <Hjelpelinje s={s} x1={0} y1={4} x2={2} y2={4} farge="muted" />}
              </>
            )}
            xmin={-3}
            xmax={5}
            ymin={-4}
            ymax={6}
            h={340}
            ynavn="g(x)"
            title="Grafen til g(x) = −0,5x² + x + 4 med symmetrilinja x = 1"
          />
        ) : (
          <div className="stack reveal" style={{ gap: 10 }}>
            <h3>Løsning med programmering</h3>
            <pre className="kode" style={{ fontSize: '0.72em' }}>
              <span className="k">def</span> g(x):{'\n'}
              {'    '}
              <span className="k">return</span> -0.5*x**2 + x + 4{'\n'}
              {'\n'}
              <span className="s"># oppretter variabler</span>
              {'\n'}a = -0.5{'\n'}b = 1{'\n'}c = 4{'\n'}
              {'\n'}
              <span className="s"># formel for symmetrilinje</span>
              {'\n'}x = -b/(2*a){'\n'}
              <span className="s"># finner skjæring med y-akse</span>
              {'\n'}y = g(0){'\n'}
              {'\n'}print(f<span className="s">'Symmetrilinja er x = {'{x}'}'</span>){'\n'}
              print(f<span className="s">'Grafen skjærer y-aksen i {'{y}'}'</span>){'\n'}
              print(f<span className="s">'Symmetri om x = 1 gir g(2) = g(0) = {'{y}'}'</span>)
            </pre>
            <pre className="kode">
              Symmetrilinja er x = 1.0{'\n'}
              Grafen skjærer y-aksen i 4.0{'\n'}
              Symmetri om x = 1 gir g(2) = g(0) = 4.0
            </pre>
          </div>
        )}
      </div>
    </div>
  </div>
);
