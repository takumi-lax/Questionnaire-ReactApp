import React from 'react';

// ルーティングに使うコンポーネントをインポート
import Home from './Home.js';
import PreQuestionnaire from './PreQuestionnaire';
import Questionnaire from './Questionnaire';
import ReQuestionnaire from './ReQuestionnaire';
import DoneTheme from './DoneTheme';
import Result from './Result';

// ルーティング機能を使うために必要
import { BrowserRouter as Router, Route } from "react-router-dom";

// ルーティング設定
export default function MyRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/pre_questionnaire" exact component={PreQuestionnaire} />
      <Route path="/questionnaire" exact component={Questionnaire} />
      <Route path="/requestionnaire" exact component={ReQuestionnaire} />
      <Route path="/done" exact component={DoneTheme} />
      <Route path="/result" exact component={Result} />
    </Router>
  );
}