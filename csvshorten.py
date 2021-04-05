import csv

with open("C:/Users/836844/Documents/starchart/hygdata_v3.csv", "r") as file, open("C:/Users/836844/Documents/starchart/visiblestars.csv", "w", newline='') as out:
    reader = csv.reader(file)
    writer = csv.writer(out)

    writer.writerow(next(reader))
    for row in reader:
        if(float(row[13]) <= 7.0):
            writer.writerow(row)
      

