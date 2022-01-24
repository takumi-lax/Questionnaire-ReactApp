import pickle
import json

import os
dic = {}
files = os.listdir("./images")
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
                                            "8":-1,}}



with open('dic_bin.pickle', 'wb') as f:
    pickle.dump(dic, f)

with open('dic.json', 'w') as f:
    json.dump(dic,f, sort_keys=True, indent=4)

