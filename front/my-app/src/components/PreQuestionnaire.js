import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import MyRadioGroup from './MyRadioGroup';
import { PRE_QUESTIONNAIRES } from '../utils/Constants';
import { Button, makeStyles } from '@material-ui/core';
// import firebase from 'firebase/compat/app'

import Axios from 'axios';

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const PreQuestionnaire = props => {
  const classes = useStyles();

  const [isSubmitButtonAnabled, setIsSubmitButtonAnabled] = useState(false);
  const initialAnswers = PRE_QUESTIONNAIRES.map((questionnaire, key)=>{
    return {questionnaireId: questionnaire.id, selectedAt: null, value: null}
  });
  const [answers, setAnswers] = useState(initialAnswers);
  // const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    getAndSetStartTime();
  }, []);
  
  const getAndSetStartTime = () => {
    // const date = new Date();
    // const currentTime = date.getTime();
    // setStartTime(currentTime);
  };

  // ------------------- ここよくわかってない -------------------
  // 非同期処理を含む関数の宣言
  // async function save() {
  //   var data = {};
  //   const date = new Date();
  //   const currentTime = date.getTime();
  //   // 非同期処理
  //   const newAnswerRef = await firebase.database().ref("pre_answers").push();
  //   data["started_at"] = startTime;
  //   data["submitted_at"] = currentTime;
  //   data["contents"] = {}
  //   answers.forEach( answer => {
  //     const newContentRef = newAnswerRef.child("contents").push();
  //     const newContentKey = newContentRef.key
  //     data["contents"][newContentKey] = {};
  //     data["contents"][newContentKey]["questionaire_id"] = answer.questionnaireId;
  //     data["contents"][newContentKey]["value"] = answer.value;
  //     data["contents"][newContentKey]["selected_at"] = answer.selectedAt;
  //   });
  //   // 非同期処理
  //   await newAnswerRef.set(data);
  // };

  const startQuestionnaire = () => {
    props.history.push({
      pathname: "/questionnaire",
    });
  };

  const handleClick = () => {
    startQuestionnaire();
    pre(answers);
  };
  

  const pre = (answers) => {
    Axios.post('http://127.0.0.1:5000/prequestionnaire_test', {
        res : answers
      }).then(function(res) {
        console.log("OK");
      })
  };

  return (
    <div className={classes.root}>

      <b>今日の体調・気分について教えてください</b>
      <div className={classes.radioGroups}>

      {/* mapは配列内の要素をコールバックで処理（加工）して、配列としてreturnするメソッド */}
      {/* questionnaireはPRE_QUESTIONNAIRESで定義した配列の中身 */}

        {PRE_QUESTIONNAIRES.map((questionnaire, key)=>

          <div className={classes.radioGroup} key={key}>

            <MyRadioGroup
              questionnaire={questionnaire}
              answers={answers}
              setAnswers={setAnswers}
              setIsSubmitButtonAnabled={setIsSubmitButtonAnabled}
            />

          </div>
        )}
      </div>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        disabled={!isSubmitButtonAnabled}
      >
        次へ
      </Button>



    </div>
  );
}

export default withRouter(PreQuestionnaire);