// 必要なモジュールのインポート
import React from 'react';
import './App.css';
// 使用するコンポーネント
import MyRouter from './components/MyRouter';
import HeaderBar from './components/HeaderBar';
import { makeStyles } from '@material-ui/core';
import firebase from "firebase";


// firebaseの設定
var firebaseConfig = {
  apiKey: "foo",
  authDomain: "foo",
  databaseURL: "foo",
  projectId: "foo",
  storageBucket: "foo",
  messagingSenderId: "foo",
  appId: "foo",
  measurementId: "foo"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}
firebase.analytics();

// CSS in JS
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    display: "grid",
    "grid-template-rows": "1fr 20fr",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HeaderBar/>
      <MyRouter/>
    </div>
  );
}

export default App;