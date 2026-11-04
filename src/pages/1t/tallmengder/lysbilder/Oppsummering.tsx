import React from 'react';
import { Frac, Rot, X } from '../../../../presentasjon/matte';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Mengde</th>
            <th>Hva den inneholder</th>
            <th>Eksempler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b className="pen">ℕ naturlige</b></td>
            <td>tellertallene</td>
            <td className="math">1, 2, 3, …</td>
          </tr>
          <tr>
            <td><b className="pen">ℤ hele</b></td>
            <td>de naturlige tallene, 0 og de negative</td>
            <td className="math">−2, 0, 5</td>
          </tr>
          <tr>
            <td><b className="pen">ℚ rasjonale</b></td>
            <td>alle brøker av hele tall. Desimalene tar slutt eller gjentar seg</td>
            <td className="math"><Frac n="3" d="4" />, 0,25, 0,333…</td>
          </tr>
          <tr>
            <td><b className="pen">ℝ reelle</b></td>
            <td>alle punktene på tallinja, også de irrasjonale</td>
            <td className="math"><Rot>2</Rot>, π, −1,5</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="boxed">
      <span className="label">Intervaller</span>
      <span className="math nw">[−1 , 4⟩</span> &nbsp;betyr&nbsp; <span className="math nw">−1 ≤ <X /> &lt; 4</span>. Hakeparentes: tallet er med.
      Spissparentes: tallet er ikke med.
    </div>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Tegn</th>
            <th>Betyr</th>
            <th>Eksempel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="math"><b className="pen">∈</b> &nbsp;<b className="pen">∉</b></td>
            <td>ligger i, ligger ikke i</td>
            <td className="math">3 ∈ ℕ, &nbsp;√2 ∉ ℚ</td>
          </tr>
          <tr>
            <td className="math"><b className="pen">⊂</b></td>
            <td>er delmengde av</td>
            <td className="math">ℕ ⊂ ℤ</td>
          </tr>
          <tr>
            <td className="math"><b className="pen">\</b></td>
            <td>utenom</td>
            <td className="math">ℝ \ {'{'}0{'}'}</td>
          </tr>
          <tr>
            <td className="math"><b className="pen">∪</b></td>
            <td>union: tallene som ligger i minst én av mengdene</td>
            <td className="math">[0 , 1] ∪ [3 , 4]</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="muted">Regn ut først, og bestem tallmengden etterpå: √9 er naturlig, og 3,14 er rasjonalt.</p>
  </div>
);
