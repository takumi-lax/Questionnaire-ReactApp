import pickle
import json
import csv
import os
dic = {}
files = os.listdir("./images")
# files = os.listdir("./images2")
files = [os.path.splitext(file)[0] for  file  in files if not file.startswith('.')]

# print(files)
for file in files:
    dic[file] = {"answered":0,
                "questionnaire_anseweres":{"0":-1,
                                            "1":-1,
                                            "2":-1,
                                            "3":-1,
                                            "4":-1,
                                            "5":-1,
                                            "6":-1,
                                            "7":-1,
                                            "8":-1,
                                            "answer_time":-1,
                                            "time":-1}}

with open('dic_bin.pickle', 'wb') as f:
    pickle.dump(dic, f)

with open('dic.json', 'w') as f:
    json.dump(dic,f, sort_keys=True, indent=4)

with open('PreQuestionnaireResults.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(["selectedAt","value1_taityou_id9","value_kibunn_id10"])

with open('QuestionnaireResults.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(["imageId","time","ans_3","ans_4","ans_5","ans_6","ans_7","ans_8","answer_time[ms]"])