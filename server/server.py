from flask import Flask, jsonify, request, make_response, render_template, send_file
from flask_cors import CORS
import numpy as np
from utils import wakati
import pandas as pd
import csv
import pickle
import random
from PIL import Image
from io import BytesIO
import json
# import mysql.connector
import datetime

host = 'localhost'
port = 3306
user = 'root'
password = 'humaninterface'
database_name = 'childfren_drawing_analysis'

updating = False

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def hello():
    data = {
        'status': 'OK'
    }
    return jsonify(data)

# @app.route("/posttest", methods=['GET','POST'])
# def posttest():
#     if request.method == 'POST':
#         data = request.get_json()
#         print(data)
#         dataKeys = list(data.keys())
#         dataValues = list(data.values())
#         print(dataKeys,dataValues)
        
#         with open('QuestionnaireResults.csv', 'a') as f:
#             writer = csv.writer(f)
#             # writer.writerow(dataKeys)
#             writer.writerow(dataValues)

#         with open('QuestionnaireResults.csv') as f:
#             print(f.read())

#         res = data['post_text1']
#         response = {'result': res}
#         # print(response)
#     return jsonify(response)

@app.route("/prequestionnaire_test", methods=['GET','POST'])
def prequestionnaire_test():
    if request.method == 'POST':
        
        # data = json.loads(request.get_json()["res"])
        data = request.get_json()
        
        # data = data[""]
        data = data["res"]
        print(f"{data[0]=}")
        # print(type(data))
        # output
        # data[0]={'questionnaireId': 9, 'selectedAt': 1642920752034, 'value': 4}


        # dataKeys = list(data.keys())
        # dataValues = list(data.values())
        # print(dataKeys,dataValues)
        # questionnaireId,selectedAt,value1_taityou,value_kibunn
        # print(type(data[0]["questionnaireId"]))
        if data[0]["questionnaireId"] == 9:
            value1 = data[0]["value"]
            value2 = data[1]["value"]
        else:
            value1 = data[1]["value"]
            value2 = data[0]["value"]
        
        dataValues = [datetime.datetime.fromtimestamp(int(data[0]["selectedAt"])/1000),value1,value2]
        
        with open('PreQuestionnaireResults.csv', 'a') as f:
            writer = csv.writer(f)
            # writer.writerow(dataKeys)
            writer.writerow(dataValues)

        # with open('QuestionnaireResults.csv') as f:
        #     print(f.read())
        response = {'message': 'OK'}
        # print(response)
    return jsonify(response)

@app.route("/questionnaire_test", methods=['GET','POST'])
def questionnaire_test():
    # print(111)
    if request.method == 'POST':
        data = request.get_json()

        image_id = data["imageId"]
        data = data["res"]
        print(f"{image_id=}")
        print(f"{data=}")
        # print(type(data))
        with open('dic_bin.pickle', 'rb') as f:
            dic = pickle.load(f)
        dic[image_id]["answered"] = 1
        
        ansdic = {}
        time = 0
        for d in data:
            time = max(int(d["selectedAt"]),time)
            qid = d["questionnaireId"]
            value = d["value"]
            ansdic[qid] = value
        
        for k,v in ansdic.items():
            # print(f"{dic[image_id]=}")
            dic[image_id]["questionnaire_anseweres"][str(k)] = v
            # print(k,v)

        dataValues = [image_id,datetime.datetime.fromtimestamp(int(time)/1000),ansdic[3],ansdic[4],ansdic[5],ansdic[6],ansdic[7],ansdic[8]]
        print(dataValues)
        with open('QuestionnaireResults.csv', 'a') as f:
            writer = csv.writer(f)
            # writer.writerow(dataKeys)
            writer.writerow(dataValues)

        with open('dic_bin.txt', 'wb') as f:
            pickle.dump(dic, f)
        with open('dic.json', 'w') as f:
            json.dump(dic,f, sort_keys=True, indent=4)
        # with open('QuestionnaireResults.csv') as f:
        #     print(f.read())
        response = {'message': 'OK'}
        # print(response)
    return jsonify(response)


# @app.route('/questionnaires', methods=['GET', 'POST'])
# def get_questionnaire():
#     if request.method == 'GET':
#         questionnaires = [
#         {
#             'id': 0,
#             'descriptionRight': '好き',
#             'descriptionLeft': '嫌い',
#         },
#         {
#             'id': 1,
#             'descriptionRight': '快',
#             'descriptionLeft': '不快',
#         },
#         {
#             'id': 2,
#             'descriptionRight': '面白い',
#             'descriptionLeft': '退屈な',
#         },
#         {
#             'id':3,
#             'descriptionRight': '豊である',
#             'descriptionLeft': '豊でない',
#         },
#         {
#             'id': 4,
#             'descriptionRight': 'ポジティブである',
#             'descriptionLeft': 'ポジティブでない',
#         },
#         {
#             'id': 5,
#             'descriptionRight': '明るい',
#             'descriptionLeft': '暗い',
#         },
#         {
#             'id': 6,
#             'descriptionRight': '弱々しい',
#             'descriptionLeft': '力強い',
#         },
#         {
#             'id': 7,
#             'descriptionRight': '平凡な',
#             'descriptionLeft': '独創的な',
#         },
#         {
#             'id': 8,
#             'descriptionRight': '感情的な',
#             'descriptionLeft': '理性的な',
#         },
#         ]
#         response = {'questionnaires': questionnaires}
#         return jsonify(response)

# @app.route('/answers', methods=['GET', 'POST'])
# def save():
#     if request.method == 'POST':
#         request_json = request.json
#         image_id = request_json['imageId']
#         with open('dic_bin.pickle', 'rb') as f:
#             dic = pickle.load(f)
#         # answered frg を1にする
#         dic[image_id]["answered"] = 1

#         answers = request_json['answers']
#         for answer in answers:
#             questionnaire_id = answer['questionnaireId']
#             value = answer['value']
#             dic[image_id][questionnaire_id] = value
#             # statement = '''
#             #     INSERT INTO answers (image_id, questionnaire_id, value)
#             #         VALUES ({image_id}, {questionnaire_id}, {value})
#             #             ON DUPLICATE KEY UPDATE value = {value};
#             # '''.format(
#             #         image_id=image_id,
#             #         questionnaire_id=questionnaire_id,
#             #         value=value
#             #     )
#             # cur.execute(statement)
#             # conn.commit()
#         # pickle save

#         response = {'message': 'OK'}
#         # conn.close()
#         return jsonify(response)

@app.route('/image', methods=['GET'])
def get_imageid():
    if request.method == 'GET':
    # if 1:
        # print("aaaaaaa")
        # 解答したかしていないかを保持するファイルを作る
        # 解答が終わったら解答したことを記録する
        # # pickle save
        # with open('list_bin.txt', 'wb') as f:
        #     pickle.dump(rows, f)
        
        # with open('list.txt', 'w') as f:
        #     writer = csv.writer(f)
        #     writer.writerow(rows)

        # pickle read
        with open('dic_bin.pickle', 'rb') as f:
            dic = pickle.load(f)
        # 未回答の画像のkeyのリストを取得
        non_answered_indices = [k for k,v in dic.items() if v["answered"] == 0]
        random.shuffle(non_answered_indices)
        image_id = non_answered_indices[0]

        image = {
            'id': image_id,
            'src': 'http://127.0.0.1:5000/image/{}'.format(image_id)
        }

        print(f"{image_id=}")

        return jsonify({'image': image})


@app.route('/image/<string:image_id>', methods=['GET'])
def get_image(image_id):
    if request.method == 'GET':
        img = Image.open("./images/{}.jpg".format(image_id))
        img_io = BytesIO()
        img.save(img_io, 'JPEG', quality=95)
        img_io.seek(0)
        response = make_response(send_file(img_io, mimetype='image/jpeg'))
        return response



if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)