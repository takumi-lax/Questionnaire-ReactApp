import React, { useState, useEffect } from 'react';
import MyRadioGroup from './MyRadioGroup';
import { QUESTIONNAIRES } from '../utils/Constants';
import { Button, makeStyles } from '@material-ui/core';
import Axios from 'axios';

// const drawingThemes = ["face", "winter-memory", "summer-memory", "karuta"];

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "grid",
    "grid-template-columns": "1fr 1fr",
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    // width: "100%",
    // height: "100%",
    width: "500px",
    height: "600px",
    display: "block",
    margin: "auto"
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    // objectFit: "contain",
  },
  right: {
    width: "90%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  currentAchievement: {
    flex: "2 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  radioGroups: {
    flex: "9 0 auto",
    display: "flex",
    flexDirection: "column",
  },
  radioGroup: {
    flex: "1 0 auto",
  },
  button: {
    flex: "0.3 0 auto",
  },
});

const ReQuestionnaire = props =>  {

  const classes = useStyles();

  const [isSubmitButtonAnabled, setIsSubmitButtonAnabled] = useState(false);

  const initialAnswers = QUESTIONNAIRES.map((questionnaire, key)=>{
    return {questionnaireId: questionnaire.id, selectedAt: null, value: null}
  });

  const [answers, setAnswers] = useState(initialAnswers);
  // const [themeIndex, setThemeIndex] = useState(0);
  const [imageId, setImageId] = useState();
  const [imagePath, setImagePath] = useState();
  
  const [startTime, setStartTime] = useState(0);
  const [numberOfImagesAnsweredToday, setNumberOfImagesAnsweredToday] = useState(0);

  // const [no_answered_number, setNoAnsweredNumber] = useState()
  const [aki_no_answered_number, setAkiNoAnsweredNumber] = useState()
  const [houki_no_answered_number, setHoukiNoAnsweredNumber] = useState()
  const [uwabaki_no_answered_number, setUwabakiNoAnsweredNumber] = useState()


  // const [elapsedTime, setElapsedTime] = useState(0)

  // const [numberOfImagesAnswered, setNumberOfImagesAnswered] = useState();

  useEffect(() => {
    // updateThemeIndex();
    // getAndSetStartTime();
    // getCurrentAchievement();
    const date = new Date();
    const currentTime = date.getTime();
    setStartTime(currentTime);
    getAndSetImageId();
  }, []);


  // const getAndSetStartTime = () => {
  //   const date = new Date();
  //   const currentTime = date.getTime();
  //   const elapsedTime = currentTime - startTime;
  //   setStartTime(currentTime);
  //   setElapsedTime(elapsedTime);
  //   Axios.post('http://127.0.0.1:5000/answer_time', {
  //     answer_time : elapsedTime,
  //     imageId : imageId,
  //   }).then(function(res) {
  //     console.log("OK");
  //   })
  //   // alert(startTime);
  // };

  const resetAnswers = () => {
    setAnswers(initialAnswers);
  };

  // const getCurrentAchievement = () => {
  //   const date = new Date();
  //   const currentYear = date.getFullYear();
  //   const currentMonth = date.getMonth();
  //   const currentDate = date.getDate();
  //   const _date = new Date(currentYear, currentMonth, currentDate, 0, 0, 0);
  //   const currentDateStartTime = _date.getTime()
    

    // firebase.database().ref('answers').once('value').then( snapshot => {
    //   let i = 0;
    //   snapshot.forEach( childSnapshot  => {
    //     if (childSnapshot.val().submitted_at > currentDateStartTime) {
    //       i += 1;
    //     }
    //   });
    //   setNumberOfImagesAnsweredToday(i);
    //   setNumberOfImagesAnswered(snapshot.numChildren());
    // });
  // };

  // async function updateThemeIndex() {
  //   for (let i = 0; i < drawingThemes.length; i++) {
  //     let filtered = [];
  //     await firebase.database().ref('images').orderByChild('theme').equalTo(drawingThemes[i]).once('value').then( snapshot => {
  //       const images = Object.values(snapshot.val());
  //       filtered = images.filter( image => !image.submitted_at );
  //     });
  //     if (filtered.length > 0) {
  //       setThemeIndex(i);
  //       break;
  //     }
  //   }
  // };

  // const getAndSetImageId = () => {
  //   firebase.database().ref('images').orderByChild('theme').equalTo(drawingThemes[themeIndex]).once('value').then( snapshot => {
  //     var notAnsweredImageIds = Object.keys(snapshot.val()).filter( key  => !snapshot.val()[key].submitted_at);
  //     if (notAnsweredImageIds.length > 0) {
  //       const index = Math.floor(Math.random() * Math.floor(notAnsweredImageIds.length));
  //       setImageId(notAnsweredImageIds[index]);
  //     }
  //   });
  // };

  // async function save() {
  //   var data = {};
  //   const date = new Date();
  //   const currentTime = date.getTime();
  //   const newAnswerRef = await firebase.database().ref("answers").push();
  //   data["started_at"] = startTime;
  //   data["submitted_at"] = currentTime;
  //   data["image_id"] = imageId;
  //   data["contents"] = {}
  //   answers.forEach( answer => {
  //     const newContentRef = newAnswerRef.child("contents").push();
  //     const newContentKey = newContentRef.key
  //     data["contents"][newContentKey] = {};
  //     data["contents"][newContentKey]["questionaire_id"] = answer.questionnaireId;
  //     data["contents"][newContentKey]["value"] = answer.value;
  //     data["contents"][newContentKey]["selected_at"] = answer.selectedAt;
  //   });

  //   await newAnswerRef.set(data);
  //   var updates = {};
  //   updates[`/images/${imageId}/submitted_at`] = currentTime;
  //   await firebase.database().ref().update(updates, (error) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("data saved successfully!");
  //     }
  //   });
  // };
  
  async function handleClick() {
    setIsSubmitButtonAnabled(false);
    resetAnswers();
    // getCurrentAchievement();
    await save(answers);
    getAndSetImageId();
    // getAndSetStartTime();
    // check()は残りの枚数をチェックして、0枚になったらDoneThemeに移動する関数
    await check(aki_no_answered_number,houki_no_answered_number,uwabaki_no_answered_number);
    setNumberOfImagesAnsweredToday(numberOfImagesAnsweredToday+1)
    startResult();
  };

  const startResult = () => {
    props.history.push({
      pathname: "/result",
    });
  };

  const save = (answers) => {
    const date = new Date();
    const currentTime = date.getTime();
    const elapsedTime = currentTime - startTime;
    setStartTime(currentTime);
    // setElapsedTime(elapsedTime);
    Axios.post('http://127.0.0.1:5000/questionnaire_test', {
        res : answers,
        imageId : imageId,
        answer_time : elapsedTime,
      }).then(function(res) {
        const aki_no_answered_number = res.data["aki"];
        const houki_no_answered_number = res.data["houki"];
        const uwabaki_no_answered_number = res.data["uwabaki"];
        setAkiNoAnsweredNumber(aki_no_answered_number);
        setHoukiNoAnsweredNumber(houki_no_answered_number);
        setUwabakiNoAnsweredNumber(uwabaki_no_answered_number);
      })
  };

  const check = (aki,houki,uwabaki) => {
    if (aki === 1){
      props.history.push({
        pathname: "/done",
      });
    }

    else if (houki === 1){
      props.history.push({
        pathname: "/done",
      });
    }

    else if (uwabaki === 1){
      props.history.push({
        pathname: "/done",
      });
    }
  };

  const getAndSetImageId = () => {
      const image_id = props.location.state["image_id"];
      // alert(image_id);
      setImageId(image_id);
      // 文字列にJavascript入れるときはバッククォーテーションでかこむ！！
      setImagePath(`http://127.0.0.1:5000/image/${image_id}`);
    };

  return (
    <div className={classes.root}>

      <img src={imagePath} className={classes.left} alt={imageId}/>
      <div className={classes.right}>

        <div className={classes.currentAchievement}>

        </div>


        <div className={classes.radioGroups}>

          {QUESTIONNAIRES.map((questionnaire, key)=>
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
          className={classes.button}
          onClick={handleClick}
          disabled={!isSubmitButtonAnabled}
        >
          回答修正
        </Button>

      </div>
    </div>
  );
}

export default ReQuestionnaire;