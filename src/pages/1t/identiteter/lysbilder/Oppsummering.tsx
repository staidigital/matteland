import React from 'react';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed">
      En <b>identitet</b> er en likhet som stemmer for alle verdier av variablene.
    </div>
    <ol className="steps">
      <li><span className="no">1</span><div><b>Vise en identitet:</b> regn på én side til du får den andre, eller regn begge sider hver for seg til de blir like.</div></li>
      <li><span className="no">2</span><div><b>Motbevise:</b> finn ett tall der sidene blir ulike. Det er nok.</div></li>
      <li><span className="no">3</span><div><b>Bevise med hele tall:</b> skriv tallene med bokstaver, for eksempel <span className="math nw">2<i className="v">n</i> + 1</span> for et oddetall.</div></li>
      <li><span className="no">4</span><div>Eksempler som stemmer er <b>ikke</b> et bevis, uansett hvor mange de er.</div></li>
    </ol>
    <p className="muted">Bruk parentes når du trekker fra et kvadrat, og regn på hver side for seg.</p>
  </div>
);
