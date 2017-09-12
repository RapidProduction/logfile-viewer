import {
  isNil,
  get,
} from 'lodash';
import {
  array,
  object,
  func,
} from 'prop-types';
import React from 'react';

import ContentView from '../ContentView';
import ErrorView from '../ErrorView/ErrorView';
import Searchbar from '../Searchbar';

import './LogfileView.scss';

const LogfileView = ({
  // props
  logfileContents, error, isLoading,
  // events
  onSearchClick, onBackToBeginning,
  onBack, onNext, onNextToEnd,
}) => (
  <div className="logfile-view__container">
    <Searchbar handleSubmit={onSearchClick} />
    {
      !isLoading && isNil(error) ?
      <ErrorView
        title={"Welcome to logfile view application"}
        description={"Please fill in the filename and click view to see logfile content"}
        clickHandler={onSearchClick} /> :
        isLoading ?
        <ErrorView
          title={"Loading..."}
          description={"Loading file content, please wait a second"}
          clickHandler={onSearchClick} /> :
        isNil(error) ?
          <ContentView contents={logfileContents}/> :
          <ErrorView
            title={"There is some error occur"}
            description={"Please click here to try to reload again"}
            clickHandler={onSearchClick} />
    }
    <div className="logfile-view__container__control">
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onBackToBeginning}>
        {"|<"}
      </button>
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onBack}>
        {"<"}
      </button>
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onNext}>
        {">"}
      </button>
      <button
        disabled={error || get(logfileContents ,'length', 0) <= 0}
        onClick={onNextToEnd}>
        {">|"}
      </button>
    </div>
  </div>
);

LogfileView.propTypes = {
  error: object,
  logfileContents: array,
  onSearchClick: func,
  onBackToBeginning: func,
  onBack: func,
  onNext: func,
};

export default LogfileView;