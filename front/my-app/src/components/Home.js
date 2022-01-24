// useState,useEffectを使う
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button, makeStyles } from '@material-ui/core';
// import firebase from 'firebase/compat/app'

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
  }
});

const Home = props => {
  const classes = useStyles();

  // useState関数の返却値は配列の形で、1つ目にState変数、2つ目にそのStateを更新する関数が設定される
  // 引数に何も指定しないとき、初期値はundefinedになる
  const [numberOfImagesAnsweredToday, setNumberOfImagesAnsweredToday] = useState(0);
  // useState(false)は、isButtonAnabledの初期値をfalseに設定したということ
  // const [isButtonAnabled, setIsButtonAnabled] = useState(true);

  const isButtonAnabled = true;
  
  // useEffect:「ある値が変わったときに限り、ある処理を実行する」機能
  // 第1引数:実行する関数、第2引数:[依存する値]
  // 第2引数を[]のようにすれば、「コンポーネントを表示した初回のみ実行するような処理」を記述できる
  // なぜこんな機能があるか:
  // コンポーネントは再レンダリングを何度も繰り返しており、そのたびにこの処理を実行していたら時間が無駄にかかるなーというとき
  // この値が変わったときだけ再レンダリングするようにしたいなってときに使う！！
  useEffect(() => {
    // const date = new Date();

    // const currentYear = date.getFullYear();
    // const currentMonth = date.getMonth();
    // const currentDate = date.getDate();
    // const _date = new Date(currentYear, currentMonth, currentDate, 0, 0, 0);
    // const currentDateStartTime = _date.getTime();


    // ------------------- ここよくわかってない -------------------
    // firebase
    // firebase.database().ref('answers').once('value').then( snapshot => {
    //   let i = 0;
    //   snapshot.forEach( childSnapshot  => {
    //     if (childSnapshot.val().submitted_at > currentDateStartTime) {
    //       i += 1;
    //     }
    //   });
    //   setNumberOfImagesAnsweredToday(i);
    //   setIsButtonAnabled(true);
    // });
  }, []);



  const startQuestionnaire = () => {
    props.history.push({
      pathname: "/questionnaire",
    });
  };

  const startPreQuestionnaire = () => {
    props.history.push({
      pathname: "/pre_questionnaire",
    });
  };

  const handleStartButtonClick = () => {
    if (numberOfImagesAnsweredToday === 0) {
      startPreQuestionnaire();
      setNumberOfImagesAnsweredToday(1);
    } else {
      startQuestionnaire();
    }
  };
  
  const handleCheckButtonClick = () => {
    props.history.push({
      pathname: "/result",
    });
  };



  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleStartButtonClick}
        disabled={!isButtonAnabled}
      >
        回答をはじめる
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleCheckButtonClick}
        disabled={!isButtonAnabled}
      >
        回答を確認する
      </Button>

    </div>
  );
}

export default withRouter(Home);