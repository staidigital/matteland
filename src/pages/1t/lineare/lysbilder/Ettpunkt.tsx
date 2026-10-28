import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TREDJEDEL = <Frac n="1" d="3" />;
const Y = () => <V c="y" />;
const Y0 = () => (
  <span className="nw">
    <V c="y" />
    <sub>0</sub>
  </span>
);
const X0 = () => (
  <span className="nw">
    <V c="x" />
    <sub>0</sub>
  </span>
);

export const ETTPUNKT_STEG = 4;

export const Ettpunkt: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Ettpunktsformelen</div>
    <h2>Kjenner vi a og ett punkt, kjenner vi linja</h2>
    <div className="boxed">
      <span className="label">Ettpunktsformelen</span>
      En rett linje med stigningstall <V c="a" /> gjennom punktet (<X0 /> , <Y0 />) har likningen
      <p className="math big" style={{ marginTop: 4 }}>
        <Y /> − <Y0 /> = <V c="a" />(<X /> − <X0 />)
      </p>
    </div>
    <div className="cols">
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Hvorfor stemmer den?</h3>
        {frag >= 1 ? (
          <div className="reveal stack" style={{ gap: 6 }}>
            <p className="small">
              Sett inn et generelt punkt (<X />, <Y />) og det kjente punktet (<X0 />, <Y0 />) i formelen for
              stigningstallet:
            </p>
            <p className="math">
              <V c="a" /> ={' '}
              <Frac
                n={
                  <>
                    <Y /> − <Y0 />
                  </>
                }
                d={
                  <>
                    <X /> − <X0 />
                  </>
                }
              />{' '}
              <span className="small muted">| · (x − x₀)</span>
            </p>
            {frag >= 2 && (
              <p className="math reveal">
                <Y /> − <Y0 /> = <V c="a" />(<X /> − <X0 />)
              </p>
            )}
          </div>
        ) : (
          <p className="small muted">Bla videre for å se beviset.</p>
        )}
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>
          Eksempel: <V c="a" /> = −{TREDJEDEL} gjennom (6 , 2)
        </h3>
        {frag >= 3 && (
          <p className="math reveal">
            <span className="mline">
              <Y /> − 2 = −{TREDJEDEL}(<X /> − 6)
            </span>
            <span className="mline">
              <Y /> − 2 = −{TREDJEDEL}
              <X /> + 2
            </span>
          </p>
        )}
        {frag >= 4 && (
          <div className="reveal stack" style={{ gap: 6 }}>
            <div className="boxed math">
              <Y /> = −{TREDJEDEL}
              <X /> + 4
            </div>
            <p className="small muted">Samme linje som i forrige eksempel. Punktet (6 , 2) ligger jo på den!</p>
          </div>
        )}
      </div>
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={ETTPUNKT_STEG} />
  </div>
);
