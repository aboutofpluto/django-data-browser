import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useData } from "./Util";
import { getRelUrlForQuery } from "./Query";
import { SetCurrentSavedView } from "./CurrentSavedView";

import "./App.scss";

function SavedViewList(props) {
  const { baseUrl } = props;
  const [savedViews] = useData(`${baseUrl}api/views/`);
  const setCurrentSavedView = useContext(SetCurrentSavedView);

  if (!savedViews) return "";
  return (
    <div className="SavedViewList">
      <h1>Saved Views</h1>
      {savedViews.map((view, index) => (
        <div key={index}>
          <h2>
            <Link
              className="Link"
              to={view.link}
              onClick={() => setCurrentSavedView(view)}
            >
              {view.name || "<unnamed>"}
            </Link>
          </h2>
          <p>
            on {view.model} - <Link to={`/views/${view.pk}.html`}>edit</Link>
          </p>
          <p>{view.description}</p>
        </div>
      ))}
    </div>
  );
}

function HomePage(props) {
  const { sortedModels, baseUrl, defaultRowLimit, allModelFields } = props;
  const setCurrentSavedView = useContext(SetCurrentSavedView);
  setCurrentSavedView(null);

  return (
    <div className="HomePage">
      <div>
        <h1>Models</h1>
        <div>
          {sortedModels.map(({ appName, modelNames }) => (
            <>
              <h2>{appName}</h2>
              <div key={appName} className="AppModels">
                {modelNames.map((modelName) => {
                  const fullName = `${appName}.${modelName}`;
                  return (
                    <h2 key={modelName}>
                      <Link
                        to={getRelUrlForQuery(
                          {
                            model: fullName,
                            fields: [],
                            filters: allModelFields[fullName].defaultFilters,
                            limit: defaultRowLimit,
                          },
                          "html"
                        )}
                        className="Link"
                      >
                        {modelName}
                      </Link>
                    </h2>
                  );
                })}
              </div>
            </>
          ))}
        </div>
      </div>
      <SavedViewList {...{ baseUrl }} />
    </div>
  );
}

export { HomePage };
