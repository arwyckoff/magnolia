import React from 'react'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'

export const ResourcesComponent = React.createClass({

  render: function () {
    return (
      <div className="resource-container">
        <h1 className="resource-title">R<span className="smallcaps">ESOURCES</span></h1>
        <div className="resource-line"></div>
        <div className="resource-call-to-action">
          <div className="resource-action resource-pill">
            <h4>T<span className="smallcaps">REE</span> I<span className="smallcaps">NFORMATION</span></h4>
            <p>Kirkman, L. Katherine, Claud L. Brown, and Donald Joseph Leopold. 2007. Native trees of the Southeast: [an identification guide]. Portland, Or. [u.a.]: Timber Press.</p>
            <p>Wikipedia contributors, "Glossary of leaf morphology," Wikipedia, The Free Encyclopedia, <a className="landing-link" href="https://en.wikipedia.org/w/index.php?title=Glossary_of_leaf_morphology&oldid=767013415">https://en.wikipedia.org/w/index.php?title=Glossary_of_leaf_morphology&oldid=767013415</a> (accessed March 29, 2017).</p>
          </div>
          <div className="resource-action resource-pill">
            <h4>D<span className="smallcaps">RAWINGS</span></h4>
            <p>Flora of China Project. 1990. Flora of China. [Cambridge, Mass.]: [Flora of China Project]. <a className="landing-link" href="http://bibpurl.oclc.org/web/4181">http://bibpurl.oclc.org/web/4181</a>.</p>
            <p>Russischer Gartenbau-Verein in St. Petersburg, Kaiserliche Russischer Gartenbau-Verein in St. Petersburg, Deutsche Gartenbau-Gesellschaft, and Verein zur Befrderung des Gartenbaues in den Kniglich Preussisch. 1852. Gartenflora. [Place of publication not identified]: [publisher not identified]. <a className="landing-link" href="http://www.biodiversitylibrary.org/title/6769">http://www.biodiversitylibrary.org/title/6769</a>.</p>
            <p>Login log under <a className="landing-link" href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC 1.0 Public Domain</a></p>
            <p>All other images created by <a className="landing-link" href="http://marcondesian.net">Alexandre Marcondes</a> and licensed under <a className="landing-link" href="http://creativecommons.org/licenses/by-sa/4.0/">CreativeCommons ShareAlike</a></p>
          </div>
        </div>
      </div>
    )
  }
})
