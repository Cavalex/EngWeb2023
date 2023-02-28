def main():
    with open('dataset-extra1.json', 'r', encoding="utf-8") as f:
        lines = f.readlines()
        #print(lines)

    id = 1

    newLines= []

    for l in lines:
        if "nome" in l:
            newLine = l + "      \"id\":" + str(id) + ",\n"
            id += 1
            #print(repr(newLine))
            newLines.append(newLine)
        else:
            newLines.append(l)
        
    with open("dataset_parsed.json", "w", encoding="utf-8") as f:
        f.write("".join(newLines))
        
        
if __name__ == '__main__':
    main()
