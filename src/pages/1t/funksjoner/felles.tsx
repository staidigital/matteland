import React from 'react';
import { V, dec } from '../../../presentasjon/matte';

/** D_f, V_g osv. */
export const Mengde: React.FC<{ m: 'D' | 'V'; f?: string }> = ({ m, f = 'f' }) => (
  <span className="nw">
    <V c={m} />
    <sub>
      <i className="v">{f}</i>
    </sub>
  </span>
);

/** Intervall med norsk skrivemåte: [a , b], ⟨a , b⟩, [a , →⟩ osv. */
export const Intervall: React.FC<{ a: number; b: number; aMed?: boolean; bMed?: boolean }> = ({
  a,
  b,
  aMed = true,
  bMed = true,
}) => (
  <span className="nw">
    {aMed ? '[' : '⟨'}
    {dec(a)} , {isFinite(b) ? dec(b) : '→'}
    {isFinite(b) && bMed ? ']' : '⟩'}
  </span>
);

/** f(x) med valgfritt funksjonsnavn og variabel */
export const Fx: React.FC<{ f?: string; x?: React.ReactNode }> = ({ f = 'f', x = <i className="v">x</i> }) => (
  <span className="nw">
    <i className="v">{f}</i>({x})
  </span>
);

/** Liten verditabell med to rader. `pa` markerer en kolonne. */
export const Verditabell: React.FC<{
  x: React.ReactNode;
  y: React.ReactNode;
  xs: (number | string)[];
  ys: (number | string)[];
  pa?: number;
}> = ({ x, y, xs, ys, pa }) => (
  <div className="tablewrap">
    <table className="vt">
      <tbody>
        <tr>
          <th>{x}</th>
          {xs.map((v, i) => (
            <td key={i} className={i === pa ? 'on' : undefined}>
              {typeof v === 'number' ? dec(v) : v}
            </td>
          ))}
        </tr>
        <tr>
          <th>{y}</th>
          {ys.map((v, i) => (
            <td key={i} className={i === pa ? 'on' : undefined}>
              {typeof v === 'number' ? dec(v) : v}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);
