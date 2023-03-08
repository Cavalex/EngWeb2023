import json

f = open("dataset-extra1.json", encoding="utf-8")
pessoas = json.load(f)
f.close()

for index, p in enumerate(pessoas['pessoas']):
    p['id'] = "p" + str(index)

f = open("dataset-extra1.json", "w", encoding="utf-8")
json.dump(pessoas, f, ensure_ascii=False, indent=4) # é preciso meter o ensure_ascii a False para que os acentos sejam escritos corretamente!
f.close()

print("adicionados " + str(index+1) + " identificadores.")
